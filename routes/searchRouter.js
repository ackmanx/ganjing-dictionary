const router = require('express').Router()
const dirty = require('dirty')

const db = dirty(`${__dirname}/../resources/dictionary.db`).on('load', () =>
    console.log('database created and loaded')
)

db.on('error', function (error) {
    console.error(error)
})

router.get('/:query', function (req, res, next) {
    const query = req.params.query
    const results = []

    db.forEach((id, entry) => {
        if (entry.simplified == query) {
            results.push(entry)
        }
        else if (entry.english.join('|||').indexOf(query) !== -1) {
            results.push(entry)
        }
    })

    res.send(results)
})


module.exports = router
