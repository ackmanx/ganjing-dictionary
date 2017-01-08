window.ESC = 27
window.ENTER = 13
window.GANJING_TITLE_PREFIX = '干净 gānjìng'

define(function (require) {

    const m = require('mithril')
    const ActionBar = require('component/actionBar')
    const Results = require('component/results')
    const AppModel = require('model/AppModel')

    const App = {
        controller: function () {
            this.am = new AppModel({
                query: m.route.param('searchQuery')
            })
        },
        view: (ctrl) =>
            m('div#wrapper',
                m('header',
                    m('a[href=/]', m('h1', '干净 gānjìng'))
                ),
                m('main',
                    m(ActionBar, {am: ctrl.am}),
                    m(Results, {am: ctrl.am})
                )
            )
    }

    m.route(document.body, '/', {
        '/': App,
        '/:searchQuery': App
    })
})