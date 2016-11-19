const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const expressLess = require('express-less')

const app = express()


//----------------//----------------//----------------//----------------//----------------
// Controller/Route Config
//----------------//----------------//----------------//----------------//----------------
const indexController = require('./server/controller/indexController')
const searchController = require('./server/controller/searchController')

app.use('/', indexController)
app.use('/search', searchController)


//----------------//----------------//----------------//----------------//----------------
// View Config
//----------------//----------------//----------------//----------------//----------------
app.set('views', path.join(__dirname, 'server/views'))
app.set('view engine', 'hbs')


//----------------//----------------//----------------//----------------//----------------
// Uhhh Stuff I Guess
//----------------//----------------//----------------//----------------//----------------
app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//Serve the public folder as static resource
app.use(express.static(path.join(__dirname, 'public')))
app.use(favicon(path.join(__dirname, 'public', 'favicon-128.png')))

app.use('/css', expressLess(`${__dirname}/public/css`))


//----------------//----------------//----------------//----------------//----------------
// App Error Handlers
//----------------//----------------//----------------//----------------//----------------
//Catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500)
        res.send({
            message: err.message,
            error: err
        })
    })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.send({
        message: err.message,
        error: {}
    })
})

module.exports = app
