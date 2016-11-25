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
    )
    console.log('finished processing dictionary')
    process.exit()
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
    const pinyinWithNumbers = chineseHalf.split('[')[1].replace('] ', '')
    pinyinWithAccents = convertToneNumbersToAccents(pinyinWithNumbers)

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
//----------------//----------------//----------------//----------------//----------------
function determineHSK(simplified) {
    let hskForCharacter = null

    for (let level in hsk) {
        if (hsk[level].includes(simplified)) hskForCharacter = level
    }

    return parseInt(hskForCharacter)
}


//----------------//----------------//----------------//----------------//----------------
// Converts from tone numbers to accents for readability
//----------------//----------------//----------------//----------------//----------------
function convertToneNumbersToAccents(pinyin) {

    return pinyin
        .replace(/a1/g, "ā")
        .replace(/a2/g, "á")
        .replace(/a3/g, "ǎ")
        .replace(/a4/g, "à")
        .replace(/e1/g, "ē")
        .replace(/e2/g, "é")
        .replace(/e3/g, "ě")
        .replace(/e4/g, "è")
        .replace(/i1/g, "ī")
        .replace(/i2/g, "í")
        .replace(/i3/g, "ǐ")
        .replace(/i4/g, "ì")
        .replace(/o1/g, "ō")
        .replace(/o2/g, "ó")
        .replace(/o3/g, "ǒ")
        .replace(/o4/g, "ò")
        .replace(/u1/g, "ū")
        .replace(/u2/g, "ú")
        .replace(/u3/g, "ǔ")
        .replace(/u4/g, "ù")
        .replace(/ü1/g, "ǖ")
        .replace(/ü2/g, "ǘ")
        .replace(/ü3/g, "ǚ")
        .replace(/ü4/g, "ǜ")
        .replace(/an1/g, "ān")
        .replace(/an2/g, "án")
        .replace(/an3/g, "ǎn")
        .replace(/an4/g, "àn")
        .replace(/ang1/g, "āng")
        .replace(/ang2/g, "áng")
        .replace(/ang3/g, "ǎng")
        .replace(/ang4/g, "àng")
        .replace(/en1/g, "ēn")
        .replace(/en2/g, "én")
        .replace(/en3/g, "ěn")
        .replace(/en4/g, "èn")
        .replace(/eng1/g, "ēng")
        .replace(/eng2/g, "éng")
        .replace(/eng3/g, "ěng")
        .replace(/eng4/g, "èng")
        .replace(/in1/g, "īn")
        .replace(/in2/g, "ín")
        .replace(/in3/g, "ǐn")
        .replace(/in4/g, "ìn")
        .replace(/ing1/g, "īng")
        .replace(/ing2/g, "íng")
        .replace(/ing3/g, "ǐng")
        .replace(/ing4/g, "ìng")
        .replace(/ong1/g, "ōng")
        .replace(/ong2/g, "óng")
        .replace(/ong3/g, "ǒng")
        .replace(/ong4/g, "òng")
        .replace(/uv/g, "ǚ")
        .replace(/un1/g, "ūn")
        .replace(/un2/g, "ún")
        .replace(/un3/g, "ǔn")
        .replace(/un4/g, "ùn")
        .replace(/er2/g, "ér")
        .replace(/er3/g, "ěr")
        .replace(/er4/g, "èr")
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
        .replace(/eī/g, "èi")
}
