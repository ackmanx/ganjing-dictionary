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
            process.exit()
        }
    )
    console.log('finished processing giantEffing dictionary')
})


//----------------//----------------//----------------//----------------//----------------
// Compile HSK object for comparisons later
//----------------//----------------//----------------//----------------//----------------
function loadHSK() {
    const hsk = {}

    for (let level = 1; level <= 6; level++) {
        let levelPath = SOURCE_HSK_LIST_PATH.replace('<#>', level)
        const characters = fs.readFileSync(levelPath, 'utf8')
        hsk[level] = characters.split('\r\n')
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
    const [chineseHalf, ...englishHalves] = line.split('/')
    englishHalves.pop() //throw away the empty element from the split

    const simplified = chineseHalf.split(' ', 2)[1]
    const pinyinWithNumbers = chineseHalf.split('[')[1].replace('] ', '')
    const pinyinWithAccents = convertToneNumbersToAccents(pinyinWithNumbers)

    const hskLevel = determineHSK(simplified)

    const entry = {
        simplified: simplified,
        pinyin: pinyinWithAccents,
        pinyinNoTone: pinyinWithNumbers.replace(/\d/g, '').toLocaleLowerCase(),
        english: englishHalves,
        hsk: hskLevel
    }

    giantEffingDB.set(id.next().value, entry)

    if (hskLevel) {
        hskDB[hskLevel].set(id.next().value, entry)
    }
}


//----------------//----------------//----------------//----------------//----------------
// Check passed in character against HSK lists
// There are many cases where a character is on the HSK list, but that character may have multiple definitions and only one definition is HSK
// We need to check both the character and the pinyin to make sure we have the correct definition
//      BUT! AHH HHAHAHAA it's not easy.
//      Comparing an HSK list against MDBG entries introduces a host of new problems...
//      Spaces in one list but not the other, tone change rules with 一 and 不 in one but not the other, skipping 2nd tone in a "word" sometimes, yīdiǎner vs yīdiǎnr
//      Finding these unique cases in all 6,000+ HSK entries is not worth not it
//----------------//----------------//----------------//----------------//----------------
function determineHSK(simplified) {
    let hskForCharacter

    for (let level in hsk) {
        if (hsk[level].includes(simplified)) hskForCharacter = level
        }

    return parseInt(hskForCharacter) || null
}


//----------------//----------------//----------------//----------------//----------------
// Converts from tone numbers to accents for readability
//----------------//----------------//----------------//----------------//----------------
function convertToneNumbersToAccents(pinyin) {

    //Replace numbers with tone marks... but there will be some mistakes to correct later in the chain
    return pinyin
        .replace(/a1/g, "ā")
        .replace(/a2/g, "á")
        .replace(/a3/g, "ǎ")
        .replace(/a4/g, "à")
        .replace(/a5/g, "a")
        .replace(/e1/g, "ē")
        .replace(/e2/g, "é")
        .replace(/e3/g, "ě")
        .replace(/e4/g, "è")
        .replace(/e5/g, "e")
        .replace(/i1/g, "ī")
        .replace(/i2/g, "í")
        .replace(/i3/g, "ǐ")
        .replace(/i4/g, "ì")
        .replace(/i5/g, "i")
        .replace(/o1/g, "ō")
        .replace(/o2/g, "ó")
        .replace(/o3/g, "ǒ")
        .replace(/o4/g, "ò")
        .replace(/o5/g, "o")
        .replace(/u1/g, "ū")
        .replace(/u2/g, "ú")
        .replace(/u3/g, "ǔ")
        .replace(/u4/g, "ù")
        .replace(/u5/g, "u")
        .replace(/ü1/g, "ǖ")
        .replace(/ü2/g, "ǘ")
        .replace(/ü3/g, "ǚ")
        .replace(/ü4/g, "ǜ")
        .replace(/ü5/g, "ü")
        .replace(/an1/g, "ān")
        .replace(/an2/g, "án")
        .replace(/an3/g, "ǎn")
        .replace(/an4/g, "àn")
        .replace(/an5/g, "an")
        .replace(/ang1/g, "āng")
        .replace(/ang2/g, "áng")
        .replace(/ang3/g, "ǎng")
        .replace(/ang4/g, "àng")
        .replace(/ang5/g, "ang")
        .replace(/en1/g, "ēn")
        .replace(/en2/g, "én")
        .replace(/en3/g, "ěn")
        .replace(/en4/g, "èn")
        .replace(/en5/g, "en")
        .replace(/eng1/g, "ēng")
        .replace(/eng2/g, "éng")
        .replace(/eng3/g, "ěng")
        .replace(/eng4/g, "èng")
        .replace(/eng5/g, "eng")
        .replace(/in1/g, "īn")
        .replace(/in2/g, "ín")
        .replace(/in3/g, "ǐn")
        .replace(/in4/g, "ìn")
        .replace(/in5/g, "in")
        .replace(/ing1/g, "īng")
        .replace(/ing2/g, "íng")
        .replace(/ing3/g, "ǐng")
        .replace(/ing4/g, "ìng")
        .replace(/ing5/g, "ing")
        .replace(/ong1/g, "ōng")
        .replace(/ong2/g, "óng")
        .replace(/ong3/g, "ǒng")
        .replace(/ong4/g, "òng")
        .replace(/ong5/g, "ong")
        .replace(/uv/g, "ǚ")
        .replace(/un1/g, "ūn")
        .replace(/un2/g, "ún")
        .replace(/un3/g, "ǔn")
        .replace(/un4/g, "ùn")
        .replace(/un5/g, "un")
        .replace(/er1/g, "ēr")
        .replace(/er2/g, "ér")
        .replace(/er3/g, "ěr")
        .replace(/er4/g, "èr")
        .replace(/er5/g, "er")
        //Correct mistakes from above... example wei4 becomes weì, which is invalid pinyin
        .replace(/aō/g, "āo")
        .replace(/aó/g, "áo")
        .replace(/aǒ/g, "ǎo")
        .replace(/aò/g, "ào")
        .replace(/oū/g, "ōu")
        .replace(/oú/g, "óu")
        .replace(/oǔ/g, "ǒu")
        .replace(/où/g, "òu")
        .replace(/aī/g, "āi")
        .replace(/aí/g, "ái")
        .replace(/aǐ/g, "ǎi")
        .replace(/aì/g, "ài")
        .replace(/eī/g, "ēi")
        .replace(/eí/g, "éi")
        .replace(/eǐ/g, "ěi")
        .replace(/eì/g, "èi")
}
