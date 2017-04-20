const m = require('mithril')

const Entry = function (data) {
    data = data || {}
    this.simplified = m.prop(data.simplified || '')
    this.pinyin = m.prop(data.pinyin || '')
    this.english = m.prop(data.english || [])
    this.hsk = m.prop(data.hsk)
    this.distance = m.prop(data.distance)
}

Entry.search = function (appModel) {
    //The back-end replaces special characters in query with spaces
    //So, we need to do the same so that comparing the query against a potential entry works
    let query = appModel.query().replace(/[!@^&-=_\[\]|;`\/\\#,+()$~%.'":*?<>{}]/g, ' ').trim()

    //Cheat to get no results instead of a 404 because I don't know to use Express
    query = query || 'XemptyX'

    return m.request({
        method: 'GET',
        url: `/search/${query}?hskOnly=${appModel.hskOnly()}`,
        type: Entry,
        background: true //causes mithril to redraw after request is sent but not redraw after the request callback
    })
}

module.exports = Entry