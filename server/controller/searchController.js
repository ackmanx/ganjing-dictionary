/*
 * Mapping: /search
 */
const globals = require('../../globals')
const router = require('express').Router()
const levenshtein = require('fast-levenshtein')
const debug = require('debug')('Chinese:searchController')

const dirty = require('dirty')
const giantEffingDB = dirty(globals.db_paths.giantEffing)
const hskDB = {
    1: dirty(globals.db_paths.hsk1),
    2: dirty(globals.db_paths.hsk2),
    3: dirty(globals.db_paths.hsk3),
    4: dirty(globals.db_paths.hsk4),
    5: dirty(globals.db_paths.hsk5),
    6: dirty(globals.db_paths.hsk6)
}


//----------------//----------------//----------------//----------------//----------------
// /:query
//----------------//----------------//----------------//----------------//----------------
router.get('/:query', function (req, res, next) {
    const query = req.params.query.toLowerCase()
    const results = []
    debug('query... ' + query)

    giantEffingDB.forEach((id, entry) => {
        //todo: break into functions
        if (entry.simplified.includes(query)) {
            const distance = levenshtein.get(query, entry.simplified)
            if (distance <= 4) {
                entry.distance = distance
                results.push(entry)
            }
        }
        if (entry.pinyin.toLowerCase().includes(query)) {
            const distance = levenshtein.get(query, entry.pinyinNoTone)
            if (distance <= 10) {
                entry.distance = distance
                results.push(entry)
            }
        }
        if (entry.english.join('|').toLowerCase().includes(query)) {
            //todo: levenshtein doesn't play nice here because we are joining. need to loop through each english and make a decision
            results.push(entry)
        }
    })

    debug('search results size... ' + results.length)

    res.send(results)
})


//----------------//----------------//----------------//----------------//----------------
// /:hskLevel
//----------------//----------------//----------------//----------------//----------------
router.get('/hsk/:level/:query', function (req, res, next) {
    const level = req.params.level
    const query = req.params.query
    const results = []

    hskDB[level].forEach((id, entry) => {
        //todo: cap from above
    })

    res.send(results)
})


module.exports = router
