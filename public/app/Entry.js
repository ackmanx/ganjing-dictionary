define(function (require) {

    const m = require('mithril')

    const Entry = function (data) {
        data = data || {}
        this.simplified = m.prop(data.simplified || '')
        this.pinyin = m.prop(data.pinyin || '')
        this.english = m.prop(data.english || [])
        this.hsk = m.prop(data.hsk || '')
    }

    Entry.search = function (query) {
        return m.request({method: 'GET', url: `/search/${query}`, type: Entry})
    }

    Entry.hskSearch = function (level, query) {
        return m.request({method: 'GET', url: `/search/hsk/${level}/${query}`, type: Entry})
    }

    return Entry
})