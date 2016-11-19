const router = require('express').Router()

router.get('/', function (req, res, next) {
    res.render('index', {title: '干净 gānjìng'})
})

module.exports = router
