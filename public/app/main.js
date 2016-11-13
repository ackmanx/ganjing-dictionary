window.ESC = 27
window.ENTER = 13

define(function (require) {

    const m = require('mithril')
    const hskButton = require('hsk')
    const searchBox = require('searchBox')
    const searchButton = require('searchButton')
    const results = require('results')

    const app = {
        controller: function () {
            this.results = m.prop([])
        },
        view: (ctrl) =>
            m('div#searchBarContainer',
                hskButton,
                m(searchBox, {results: ctrl.results}),
                searchButton,
                m(results, {results: ctrl.results})
            )
    }

    m.mount(document.body, app)
})