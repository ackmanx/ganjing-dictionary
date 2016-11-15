window.ESC = 27
window.ENTER = 13

define(function (require) {

    const m = require('mithril')
    const hskButton = require('hsk')
    const searchBox = require('searchBox')
    const searchButton = require('searchButton')
    const results = require('results')
    const AppModel = require('AppModel')

    const app = {
        controller: function () {
            this.am = new AppModel()
        },
        view: (ctrl) =>
            m('div',
                m('div.logo.hanzi', '干净'),
                m('div.the-rest-of-the-app',
                    m(searchBox, {am: ctrl.am}),
                    searchButton,
                    m(hskButton, {am: ctrl.am}),
                    m(results, {am: ctrl.am})
                )
            )
    }

    m.mount(document.body, app)
})