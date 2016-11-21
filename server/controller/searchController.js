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
    const hskOnly = req.query.hskOnly === 'true' || false
    let results = []

    //If query is not Chinese, check the length to avoid thousands and thousands and thousands of results
    if (query === 'XemptyX' || /[a-zA-Z]/.test(query) && query.length === 1) {
        debug(`Query ${query} is too short... skipping search`)
        res.send(results)
        return
    }

    if (hskOnly) {
        uberHskDB.forEach((id, entry) => {
            const result = search(query, entry)
            if (result) results.push(result)
        })
    }
    else {
        giantEffingDB.forEach((id, entry) => {
            const result = search(query, entry)
            if (result) results.push(result)
        })
    }

    debug(`search results size for ${query}... ${results.length}`)

    res.send(sortByDistanceAndHSK(results))
})


//------------------------------------------------------------------------------------------------------------
function search(query, entry) {
    let result
    query = query.toLowerCase()

    /*
     * Cannot do levenshtein as the conditional in these because 'ab' and 'cd' would be a 2, which appears relevent even though it is not
     */
    result = searchSimplified(query, entry)

    if (!result)
        result = searchPinyin(query, entry)

    if (!result)
        result = searchEnglish(query, entry)

    return result
}


//------------------------------------------------------------------------------------------------------------
function searchSimplified(query, entry) {
    let result

    if (entry.simplified.includes(query)) {
        const distance = levenshtein.get(query, entry.simplified)
        if (distance <= 10) {
            entry.distance = distance
            result = entry
        }
    }

    return result
}


//------------------------------------------------------------------------------------------------------------
function searchPinyin(query, entry) {
    let result

    if (entry.pinyinNoTone.includes(query)) {
        const distance = levenshtein.get(query, entry.pinyinNoTone)
        if (distance <= 10) {
            entry.distance = distance
            result = entry
        }
    }

    return result
}


//------------------------------------------------------------------------------------------------------------
function searchEnglish(query, entry) {
    entry.distance = 99
    let result

    entry.english.forEach(it => {
        if (it.toLowerCase().includes(query)) {
            const distance = levenshtein.get(query, it)
            if (distance <= 30) {
                if (distance < entry.distance) entry.distance = distance
                result = entry
            }
        }
    })

    return result
}


//------------------------------------------------------------------------------------------------------------
function sortByDistanceAndHSK(results) {

    results.sort(function compare(a, b) {
        if (a.distance != b.distance) {
            return a.distance - b.distance
        }
        else {
            const hskA = (a.hsk === null ? 999 : a.hsk)
            const hskB = (b.hsk === null ? 999 : b.hsk)
            return hskA - hskB
        }
    })

    return results
}


//------------------------------------------------------------------------------------------------------------
module.exports = router
