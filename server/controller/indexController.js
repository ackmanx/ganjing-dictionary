const router = require('express').Router()
const fs = require('fs')

router.get('/', function (req, res, next) {
    res.render('index', {title: '干净 gānjìng'})
})

router.get('/version', function (req, res, next) {
    fs.readFile('VERSION', 'utf8', (err, data) => {
        if (err) throw err;

        const split = data.split('#')
        res.render('app-info', {
            title: '干净 gānjìng',
            version: `${split[0]}-${split[1]}`,
            date: split[2]
        })
    })
})


module.exports = router
