/*
 * Mapping: /search
 */
const globals = require('../../globals')
const router = require('express').Router()
const levenshtein = require('fast-levenshtein')
const debug = require('debug')('Chinese:searchController')

const dirty = require('dirty')
const giantEffingDB = dirty(globals.db_paths.giantEffing)
const uberHskDB = dirty(globals.db_paths.uberHsk)

//------------------------------------------------------------------------------------------------------------
router.get('/:query', function (req, res, next) {
    const query = req.params.query.toLowerCase()
    const hskOnly = req.query.hskOnly
    const results = []

    if (hskOnly === 'true') {
        uberHskDB.forEach((id, entry) => {
            search(query, entry, results)
        })
    }
    else {
        giantEffingDB.forEach((id, entry) => {
            search(query, entry, results)
        })
    }

    debug(`search results size for ${query}... ${results.length}`)

    res.send(results)
})

//------------------------------------------------------------------------------------------------------------
function search(query, entry, results) {
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
}

//------------------------------------------------------------------------------------------------------------
module.exports = router
