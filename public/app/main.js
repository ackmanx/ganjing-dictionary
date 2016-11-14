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
            this.query = m.prop('')
        },
        view: (ctrl) =>
            m('div',
                m('div.logo.hanzi', '干净'),
                m('div.the-rest-of-the-app',
                    m(hskButton, {results: ctrl.results, query: ctrl.query}),
                    m(searchBox, {results: ctrl.results, query: ctrl.query}),
                    searchButton,
                    m(results, {results: ctrl.results})
                )
            )
    }

    m.mount(document.body, app)
})