define(function (require) {

    const m = require('mithril')

    const AppModel = function (data) {
        data = data || {}
        this.results = m.prop(data.results || [])
        this.hskLevel = m.prop(data.hskLevel || 0)
        this.query = m.prop(data.query || '')
    }

    return AppModel
})