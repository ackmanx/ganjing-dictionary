window.ESC = 27
window.ENTER = 13
window.GANJING_TITLE_PREFIX = '干净 gānjìng'

define(function (require) {

    const m = require('mithril')
    const ActionBar = require('component/ActionBar')
    const Results = require('component/Results')
    const AppModel = require('model/AppModel')

    const App = {
        controller: function () {
            this.am = new AppModel({
                query: m.route.param('searchQuery')
            })
        },
        view: (ctrl) =>
            m('div.application-container',
                m('div.not-the-footer-container',
                    m('header',
                        m('a[href=/]', m('h1', '干净 gānjìng'))
                    ),
                    m('main',
                        m(ActionBar, {am: ctrl.am}),
                        m(Results, {am: ctrl.am})
                    )
                ),
                m('footer',
                    m('a[href="about"]', 'About')
                )
            )
    }

    m.route(document.body, '/', {
        '/': App,
        '/:searchQuery': App
    })
})