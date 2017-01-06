define(function (require) {

    const m = require('mithril')

    return function (data) {
        data = data || {}
        this.results = m.prop(data.results || [])
        this.hskOnly = m.prop(data.hskOnly || false)
        this.query = m.prop(data.query || '')
        this.firstLoad = m.prop(data.firstLoad || true)
    }

})