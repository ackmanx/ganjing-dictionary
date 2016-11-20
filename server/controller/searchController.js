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
    const query = req.params.query
    const hskOnly = req.query.hskOnly
    const results = []

    //If query is not Chinese, check the length to avoid thousands and thousands and thousands of results
    if (query === 'XemptyX' || /[a-zA-Z]/.test(query) && query.length === 1) {
        debug(`Query ${query} is too short... skipping search`)
        res.send(results)
        return
    }

    if (hskOnly) {
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
    query = query.toLowerCase()

    /*
     * Cannot do levenshtein as the conditional because 'ab' and 'cd' would be a 2, which appears relevent even though it is not
     */
    if (entry.simplified.includes(query)) {
        const distance = levenshtein.get(query, entry.simplified)
        if (distance <= 10) {
            entry.distance = distance
            results.push(entry)
        }
    }
    else if (entry.pinyinNoTone.includes(query)) {
        const distance = levenshtein.get(query, entry.pinyinNoTone)
        if (distance <= 10) {
            entry.distance = distance
            results.push(entry)
        }
    }
    else {
        let addEntry = false
        entry.distance = 99

        entry.english.forEach(it => {
            if (it.toLowerCase().includes(query)) {
                const distance = levenshtein.get(query, it)
                if (distance <= 30) {
                    if (distance < entry.distance) entry.distance = distance
                    addEntry = true
                }
            }
        })

        if (addEntry) results.push(entry)
    }
}

//------------------------------------------------------------------------------------------------------------
module.exports = router
