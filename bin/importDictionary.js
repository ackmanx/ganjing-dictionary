//----------------//----------------//----------------//----------------//----------------
// Start up
//----------------//----------------//----------------//----------------//----------------
const fs = require('fs')
const readline = require('readline')
const dirty = require('dirty')

//This will be deleted and re-created on script run don't we don't have to bother with updates
const databasePath = '../resources/dictionary.db'
const dictionaryPath = '../resources/cedict_1_0_ts_utf-8_mdbg.txt'

//Word lists available free at http://www.hskhsk.com/word-lists.html
const hskPath = '../resources/HSK Official 2012 L<#>.txt'

//ID generator function globally scoped so it doesn't reset
const id = (function* idMaker() {
    let id = 0
    while (true) {
        yield id++
    }
})()

if (!fs.existsSync(dictionaryPath)) {
    console.error(`${dictionaryPath} not found`)
    process.exit()
}


//----------------//----------------//----------------//----------------//----------------
// Main
//----------------//----------------//----------------//----------------//----------------
const db = initializeDatabase()
const hsk = loadHSK()

const inStream = fs.createReadStream(dictionaryPath)
const rl = readline.createInterface({
    input: inStream
})

console.log('starting processing of dictionary file')

rl.on('line', line => addToDatabase(line))
rl.on('close', () => console.log('finished processing dictionary'))


//----------------//----------------//----------------//----------------//----------------
// Compile HSK object for comparisons later
//----------------//----------------//----------------//----------------//----------------
function loadHSK() {
    const hsk = {}

    for (let level = 1; level <= 6; level++) {
        let levelPath = hskPath.replace('<#>', level)
        const characters = fs.readFileSync(levelPath, 'utf8')
        hsk[`hsk${level}`] = characters.split('\r\n')
    }

    return hsk
}


//----------------//----------------//----------------//----------------//----------------
// Create/connect to db file and set up error handling
//----------------//----------------//----------------//----------------//----------------
function initializeDatabase() {
    fs.unlinkSync(databasePath)

    const db = dirty(databasePath).on('load', () =>
        console.log('database created and loaded')
    )

    db.on('error', function (error) {
        console.error(error)
    })

    return db
}


//----------------//----------------//----------------//----------------//----------------
// Add record to database
//----------------//----------------//----------------//----------------//----------------
function addToDatabase(line) {
    //For some reason I get a line that is an empty string, even though the file has no such line
    if (!line || line.startsWith('#')) return

    /*
     * Format:
     * Traditional Simplified [pin1 yin1] /English equivalent 1/equivalent 2/
     */
    const [chineseHalf, ...englishHalves] = line.split('/')
    englishHalves.pop()

    const simplified = chineseHalf.split(' ', 2)[1]
    const pinyin = chineseHalf.split('[')[1].replace('] ', '')

    const entry = {
        simplified: simplified,
        pinyin: pinyin,
        pinyinNoTone: pinyin.replace(/\d/g, ''),
        english: englishHalves,
        hsk: determineHSK(simplified)
    }

    db.set(id.next().value, entry)
}


//----------------//----------------//----------------//----------------//----------------
// Check passed in character against HSK lists
//----------------//----------------//----------------//----------------//----------------
function determineHSK(simplified) {
    let hskForCharacter = null

    for (let level in hsk) {
        if (hsk[level].includes(simplified)) hskForCharacter = level
    }

    return hskForCharacter
}
