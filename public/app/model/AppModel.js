//This is essentially the view-model, storing data the app uses and the search results
//The search results are actually instances of Entry.js

const m = require('mithril')

const AppModel = function (data) {
    data = data || {}
    this.results = m.prop(data.results || [])
    this.hskOnly = m.prop(data.hskOnly || false)
    this.query = m.prop(data.query || '')
    this.firstLoad = m.prop(data.firstLoad || true)
    this.loading = m.prop(data.loading || false)
}

module.exports = AppModel