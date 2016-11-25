const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const expressLess = require('express-less')
const dirty = require('dirty')
const debug = require('debug')('Chinese:app')
const fs = require('fs')
const compression = require('compression')
const hbs = require('hbs')
const EventEmitter = require('events');


const globals = require('./globals')

const app = express()


//----------------//----------------//----------------//----------------//----------------
// Initial database loads so they're available in memory for searches
//----------------//----------------//----------------//----------------//----------------
debug('Loading databases... databases to load are: ', JSON.stringify(globals.db_paths, null, 4))
let loaded = 0

const emitter = new EventEmitter();
emitter.on('db-loaded', db => {
    debug(`${db} has been loaded!`)
    loaded++
    if (loaded == 2) {
        debug('All databases have been loaded!')
    }
});

for (const key in globals.db_paths) {
    const path = globals.db_paths[key]
    if (!fs.existsSync(path)) {
        debug(`${path} is not found. That's not good. You should fix that.`)
    }
}

dirty(globals.db_paths.giantEffing).on('load', () =>
    emitter.emit('db-loaded', globals.db_paths.giantEffing)
).on('error', function (error) {
    debug(error)
})

dirty(globals.db_paths.uberHsk).on('load', () =>
    emitter.emit('db-loaded', globals.db_paths.uberHsk)
).on('error', function (error) {
    debug(error)
})


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
//Don't use layout.hbs file as a central template, but instead let routes delegate which template
app.set('view options', {layout: false})
app.set('views', path.join(__dirname, 'server/views'))
app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname, 'server/views/partials'))

//----------------//----------------//----------------//----------------//----------------
// Uhhh Stuff I Guess
//----------------//----------------//----------------//----------------//----------------
app.use(logger('dev'))
app.use(cookieParser())
app.use(compression()) //enables gzip
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
