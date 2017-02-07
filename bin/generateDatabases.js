'use strict'

/*
 This is complicated because it relies on two independent sources of data, MDBG and hskhsk.com for sources
 https://www.mdbg.net/chindict/chindict.php?page=cc-cedict
 http://www.hskhsk.com/word-lists.html

 To run, simply execute this script with Node and it will generate the *.db files
 */

//----------------//----------------//----------------//----------------//----------------
// Modules
//----------------//----------------//----------------//----------------//----------------
const fs = require('fs')
const readline = require('readline')
const dirty = require('dirty')
const concat = require('concat-files')
const pinyin = require('./pinyin.js')

//ID generator function globally scoped so it doesn't reset
const id = (function* idMaker() {
    let id = 0
    while (true) {
        yield id++
    }
})()

if (!process.cwd().endsWith('/bin')) {
    console.error('Run script from the bin directory.')
    process.exit(1)
}

//----------------//----------------//----------------//----------------//----------------
// Database Config
//----------------//----------------//----------------//----------------//----------------
//Global references to various DBs we'll create
let giantEffingDB
const hskDB = {}

//These DB paths will be deleted and re-created on script run. We don't have to bother with updates
const GIANT_EFFING_DB_PATH = '../resources/giantEffing.db'
const HSK_DB_PATH = '../resources/hsk<#>.db'

//Note this path is parsed later and <#> is replaced with a number
const SOURCE_HSK_LIST_PATH = '../resources/sourceLists/HSK Official 2012 L<#>.txt'
const SOURCE_DICTIONARY_PATH = '../resources/sourceLists/cedict_1_0_ts_utf-8_mdbg.txt'


//----------------//----------------//----------------//----------------//----------------
// Pre-validation
// Verify our source database files exist
//----------------//----------------//----------------//----------------//----------------
if (!fs.existsSync(SOURCE_DICTIONARY_PATH)) {
    console.error(`${SOURCE_DICTIONARY_PATH} not found`)
    process.exit()
}

for (let level = 1; level <= 6; level++) {
    let levelPath = SOURCE_HSK_LIST_PATH.replace('<#>', level)
    if (!fs.existsSync(levelPath)) {
        console.error(`${levelPath} not found`)
        process.exit()
    }
}


//----------------//----------------//----------------//----------------//----------------
// Main
//----------------//----------------//----------------//----------------//----------------
initializeDatabase()
const hsk = loadHSK()

const inStream = fs.createReadStream(SOURCE_DICTIONARY_PATH)
const rl = readline.createInterface({
    input: inStream
})

console.log('starting processing of dictionary file')

rl.on('line', line => addToDatabase(line))
rl.on('close', () => {
    //Now that all databases are created, add up the HSK ones for an uber-HSK database
    concat(
        [
            //input files
            '../resources/hsk1.db',
            '../resources/hsk2.db',
            '../resources/hsk3.db',
            '../resources/hsk4.db',
            '../resources/hsk5.db',
            '../resources/hsk6.db'
        ],
        //output file
        '../resources/uber-hsk.db',
        //callback after concat is finished
        () => {
            console.log('finished creating uber-hsk')

            fs.unlinkSync('../resources/hsk1.db')
            fs.unlinkSync('../resources/hsk2.db')
            fs.unlinkSync('../resources/hsk3.db')
            fs.unlinkSync('../resources/hsk4.db')
            fs.unlinkSync('../resources/hsk5.db')
            fs.unlinkSync('../resources/hsk6.db')

            process.exit()
        }
    )
    console.log('finished processing giantEffing dictionary')
})


//----------------//----------------//----------------//----------------//----------------
// Compile HSK object for comparisons later
//----------------//----------------//----------------//----------------//----------------
function loadHSK() {
    const hsk = {1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {}}

    //Go through each HSK source file and populate above map
    for (let level = 1; level <= 6; level++) {
        let levelPath = SOURCE_HSK_LIST_PATH.replace('<#>', level)
        const fileContents = fs.readFileSync(levelPath, 'utf8')

        fileContents.split('\r\n').forEach(entry => {
            const [simplified, english] = entry.split('\t')
            hsk[level][simplified] = english
        })
    }

    return hsk
}


//----------------//----------------//----------------//----------------//----------------
// Create/connect to dbs
//----------------//----------------//----------------//----------------//----------------
function initializeDatabase() {
    if (fs.existsSync(GIANT_EFFING_DB_PATH)) {
        fs.unlinkSync(GIANT_EFFING_DB_PATH)
    }
    giantEffingDB = dirty(GIANT_EFFING_DB_PATH)

    for (let level = 1; level <= 6; level++) {
        let hskDBPath = HSK_DB_PATH.replace('<#>', level)
        if (fs.existsSync(hskDBPath)) {
            fs.unlinkSync(hskDBPath)
        }
        hskDB[level] = dirty(hskDBPath)
    }
}


//----------------//----------------//----------------//----------------//----------------
// Add record to database(s)
//----------------//----------------//----------------//----------------//----------------
function addToDatabase(line) {
    //For some reason I get a line that is an empty string, even though the file has no such line
    if (!line || line.startsWith('#')) return

    /*
     * Format:
     * Traditional Simplified [pin1 yin1] /English equivalent 1/equivalent 2/
     */
    const [chineseHalf, ...englishList] = line.split('/')
    englishList.pop() //throw away the empty element from the split

    const simplified = chineseHalf.split(' ', 2)[1]
    const pinyinWithNumbers = chineseHalf.split('[')[1].replace('] ', '')
    const pinyinWithAccents = pinyin.convertToneNumbersToAccents(pinyinWithNumbers)

    const hskLevel = determineHSK(simplified, englishList)

    const entry = {
        simplified: simplified,
        pinyin: pinyinWithAccents,
        pinyinNoTone: pinyinWithNumbers.replace(/\d/g, '').toLocaleLowerCase(),
        english: englishList,
        hsk: hskLevel
    }

    giantEffingDB.set(id.next().value, entry)

    if (hskLevel) {
        hskDB[hskLevel].set(id.next().value, entry)
    }
}


//----------------//----------------//----------------//----------------//----------------
// Check passed in character against HSK lists
//----------------//----------------//----------------//----------------//----------------
function determineHSK(proposedSimplified, proposedEnglishList) {
    let hskForCharacter

    for (let level in hsk) {
        const hskEntry = hsk[level][proposedSimplified]

        if (!hskEntry) {
            continue
        }

        const removeSymbolsRegex = new RegExp(/[!@#$%^&*\[\]():,.;"\n]/, 'g')
        const proposedEnglishAsString = proposedEnglishList.join(' ').toLowerCase().replace(removeSymbolsRegex, '')

        //HSK Levels 1-4: Tokenize and compare English definitions for similarities
        if (level <= 4) {
            const tokenizedProposedEnglish = proposedEnglishAsString.split(' ')

            const blacklist = ['surname', 'variant', 'to']
            const tokenizedHskEntryEnglish = hskEntry
                .toLowerCase()
                .replace(removeSymbolsRegex, '')
                .split(' ')
                .filter(word => blacklist.indexOf(word) === -1)

            const englishSimilarities = intersect(tokenizedProposedEnglish, tokenizedHskEntryEnglish)

            if (!englishSimilarities.length) {
                continue
            }
        }
        //HSK Levels 5-6: Blacklist
        else {
            const blacklist = ['surname', 'variant']
            const blacklistSimilarities = blacklist.filter(word => proposedEnglishAsString.includes(word))

            if (blacklistSimilarities.length) continue
        }

        hskForCharacter = level
    }

    return parseInt(hskForCharacter) || null
}

function intersect(array1, array2) {
    return array1.filter(function (n) {
        return array2.indexOf(n) !== -1
    })
}