window.ESC = 27
window.ENTER = 13

define(function (require) {

    const m = require('mithril')
    const hskButton = require('hsk')
    const searchBox = require('searchBox')
    const searchButton = require('searchButton')
    const results = require('results')

    const Entry = function (data) {
        this.simplified = m.prop(data.simplified || '')
        this.pinyin = m.prop(data.pinyin || '')
        this.english = m.prop(data.english || [])
        this.hsk = m.prop(data.hsk || '')
    }

    const app = {
        controller: function () {
            this.results = m.prop([])
        },
        view: (ctrl) =>
            m('div#searchBarContainer',
                hskButton,
                m(searchBox, {Entry: Entry, results: ctrl.results}),
                searchButton,
                m(results, {results: ctrl.results})
            )
    }

    m.mount(document.body, app)
})