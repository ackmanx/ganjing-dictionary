const router = require('express').Router()
const fs = require('fs')
const globals = require('../globals')

router.get('/', function (req, res, next) {
    res.render('index', {title: '干净 gānjìng'})
})

router.get('/type-pinyin', function (req, res, next) {
    res.render('type-pinyin')
})

router.get('/app-info', function (req, res, next) {
    fs.readFile('VERSION', 'utf8', (err, data) => {
        if (err) throw err;

        const split = data.split('#')

        let dbs = []
        for (const key in globals.db_paths) {
            const split = globals.db_paths[key].split('/')
            dbs.push(`${key}: ${split[split.length - 1]}`)
        }

        res.render('app-info', {
            title: '干净 gānjìng - App Info',
            version: `${split[0]}-${split[1]}`,
            date: split[2],
            dbs: dbs
        })
    })
})


module.exports = router
