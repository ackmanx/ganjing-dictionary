const router = require('express').Router()

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Chinese'})
})

module.exports = router
