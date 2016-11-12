const globals = require('../../globals')
const router = require('express').Router()
const db = require('dirty')(globals.db_paths.giantEffingDictionary)
const levenshtein = require('fast-levenshtein')

router.get('/:query', function (req, res, next) {
    const query = req.params.query.toLowerCase()
    const results = []

    db.forEach((id, entry) => {

        if (entry.simplified == query) {
            results.push(entry)
        }
        if (entry.pinyin.toLowerCase().includes(query)) {
            results.push(entry)
        }
        if (entry.english.join('|||').toLowerCase().indexOf(query) !== -1) {
            results.push(entry)
        }
    })

    results.forEach((entry) => {
        const distance = levenshtein.get(query, entry.pinyinNoTone)
        if (distance < 10) {
            console.error(query, entry.pinyinNoTone, distance)
        }
    })
    console.error('search results size', results.length) //todo: delete me

    res.send(results)
})


module.exports = router
