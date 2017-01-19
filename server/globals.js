const path = require('path')
const express = require('express')

const app = express()

let giantEffing, uberHsk

if (app.get('env') === 'development') {
    giantEffing = path.join(__dirname, '..', 'resources', 'uber-hsk.db')
    uberHsk = path.join(__dirname, '..', 'resources', 'uber-hsk.db')
}
else {
    giantEffing = path.join(__dirname, '..', 'resources', 'giantEffing.db')
    uberHsk = path.join(__dirname, '..', 'resources', 'uber-hsk.db')
}

module.exports = {
    db_paths: {
        giantEffing: giantEffing,
        uberHsk: uberHsk
    }
}
