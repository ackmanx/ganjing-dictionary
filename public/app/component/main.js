window.ESC = 27
window.ENTER = 13
window.GANJING_TITLE_PREFIX = '干净 gānjìng'

define(function (require) {

    const m = require('mithril')
    const Search = require('component/search')
    const Results = require('component/results')
    const AppModel = require('model/AppModel')

    const app = {
        controller: function () {
            this.am = new AppModel()
        },
        view: (ctrl) =>
            m('div#wrapper',
                m('header',
                    m('h1', '干净 gānjìng')
                ),
                m('main',
                    m(Search, {am: ctrl.am}),
                    m(Results, {am: ctrl.am})
                )
            )
    }

    m.mount(document.body, app)
})