//----------------//----------------//----------------//----------------//----------------
// Start up
//----------------//----------------//----------------//----------------//----------------
const fs = require('fs')
const readline = require('readline')
const dirty = require('dirty')

const dictFile = '../resources/cedict_1_0_ts_utf-8_mdbg-test.txt'
const databasePath = '../resources/dictionary.db'

//ID generator function globally scoped so it doesn't reset
const id = (function* idMaker() {
    let id = 0
    while (true) {
        yield id++
    }
})()

if (!fs.existsSync(dictFile)) {
    console.error(`${dictFile} not found`)
    process.exit()
}


//----------------//----------------//----------------//----------------//----------------
// Main
//----------------//----------------//----------------//----------------//----------------
const db = initializeDatabase()

const inStream = fs.createReadStream(dictFile)
const rl = readline.createInterface({
    input: inStream
})

console.log('starting processing of dictionary file')

rl.on('line', line => addToDatabase(line))
rl.on('close', () => console.log('finished processing dictionary'))


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
    if (line.includes('#')) return

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
        english: englishHalves
    }

    db.set(id.next().value, entry)
}
