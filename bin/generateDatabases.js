//----------------//----------------//----------------//----------------//----------------
// Modules
//----------------//----------------//----------------//----------------//----------------
const fs = require('fs')
const readline = require('readline')
const dirty = require('dirty')
const concat = require('concat-files');

//ID generator function globally scoped so it doesn't reset
const id = (function* idMaker() {
    let id = 0
    while (true) {
        yield id++
    }
})()


//----------------//----------------//----------------//----------------//----------------
// Database Config
//----------------//----------------//----------------//----------------//----------------
//Global references to various DBs we'll create
let giantEffingDB
const hskDB = {}

//These will be deleted and re-created on script run don't we don't have to bother with updates
const giantEffingDatabasePath = '../resources/giantEffing.db'
const hskDatabasePath = '../resources/hsk<#>.db'

//Dictionary available free at http://www.mdbg.net/chindict/chindict.php?page=cc-cedict
const dictionaryPath = '../resources/sourceLists/cedict_1_0_ts_utf-8_mdbg.txt'
//Word lists available free at http://www.hskhsk.com/word-lists.html
const hskSourceListPath = '../resources/sourceLists/HSK Official 2012 L<#>.txt'


//----------------//----------------//----------------//----------------//----------------
// Pre-validation
//----------------//----------------//----------------//----------------//----------------
if (!fs.existsSync(dictionaryPath)) {
    console.error(`${dictionaryPath} not found`)
    process.exit()
}

for (let level = 1; level <= 6; level++) {
    let levelPath = hskSourceListPath.replace('<#>', level)
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

const inStream = fs.createReadStream(dictionaryPath)
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
        () => console.log('finished creating uber-hsk')
    );
    console.log('finished processing dictionary')
})


//----------------//----------------//----------------//----------------//----------------
// Compile HSK object for comparisons later
//----------------//----------------//----------------//----------------//----------------
function loadHSK() {
    const hsk = {}

    for (let level = 1; level <= 6; level++) {
        let levelPath = hskSourceListPath.replace('<#>', level)
        const characters = fs.readFileSync(levelPath, 'utf8')
        hsk[level] = characters.split('\r\n')
    }

    return hsk
}


//----------------//----------------//----------------//----------------//----------------
// Create/connect to dbs
//----------------//----------------//----------------//----------------//----------------
function initializeDatabase() {
    if (fs.existsSync(giantEffingDatabasePath)) {
        fs.unlinkSync(giantEffingDatabasePath)
    }
    giantEffingDB = dirty(giantEffingDatabasePath)

    for (let level = 1; level <= 6; level++) {
        let hskDBPath = hskDatabasePath.replace('<#>', level)
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
    const pinyin = chineseHalf.split('[')[1].replace('] ', '')

    const hskLevel = determineHSK(simplified)

    const entry = {
        simplified: simplified,
        pinyin: pinyin,
        pinyinNoTone: pinyin.replace(/\d/g, '').toLocaleLowerCase(),
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
//----------------//----------------//----------------//----------------//----------------
function determineHSK(simplified) {
    let hskForCharacter = null

    for (let level in hsk) {
        if (hsk[level].includes(simplified)) hskForCharacter = level
    }

    return parseInt(hskForCharacter)
}
