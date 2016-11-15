define(function (require) {

    const m = require('mithril')

    const Entry = function (data) {
        data = data || {}
        this.simplified = m.prop(data.simplified || '')
        this.pinyin = m.prop(data.pinyin || '')
        this.english = m.prop(data.english || [])
        this.hsk = m.prop(data.hsk || '')
    }

     Entry.search = function (query, hskOnly) {
         //Cheat to get no results instead of a 404 because I don't know to use Express
        query = query || 'no-op'
        if (hskOnly) {
            return m.request({method: 'GET', url: `/search/hsk/${query}`, type: Entry})
        }
        else {
            return m.request({method: 'GET', url: `/search/${query}`, type: Entry})
        }
    }

    return Entry
})