#!/usr/bin/env node

/**
 * Module dependencies.
 */
const debug = require('debug')('Chinese:www')
const http = require('http')

const app = require('../server/app')


/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '3002')
app.set('port', port)

/**
 * Create HTTP server.
 */
const server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

//Heroku sends this when a dyno is shutting down. Refuse connections for a graceful shutdown.
process.on('SIGTERM', server.close.bind(server))

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    const port = parseInt(val, 10)

    // named pipe
    if (isNaN(port)) return val

    // port number
    if (port >= 0) return port

    return false
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    //All errors except listen errors just get thrown
    if (error.syscall !== 'listen') {
        throw error
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port

    //Handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            debug(bind + ' requires elevated privileges')
            process.exit(1)
            break
        case 'EADDRINUSE':
            debug(bind + ' is already in use')
            process.exit(1)
            break
        default:
            throw error
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    const address = server.address()
    const bind = typeof address === 'string'
        ? 'pipe ' + address
        : 'port ' + address.port
    debug('Listening on ' + bind)
}
