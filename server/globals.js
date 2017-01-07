const path = require('path')

module.exports = {
    db_paths: {
        giantEffing: path.join(__dirname, '..', 'resources', 'uber-hsk.db'), //dev
        // giantEffing: path.join(__dirname, '..', 'resources', 'giantEffing.db'),
        uberHsk: path.join(__dirname, '..', 'resources', 'uber-hsk.db')
    }
}
