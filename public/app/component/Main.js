window.ESC = 27
window.ENTER = 13
window.GANJING_TITLE_PREFIX = '干净 gānjìng'

define(function (require) {

    const m = require('mithril')
    const Header = require('component/Header')
    const Footer = require('component/Footer')
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
                    m(Header),
                    m('main',
                        m(ActionBar, {am: ctrl.am}),
                        m(Results, {am: ctrl.am})
                    )
                ),
                m(Footer)
            )
    }

    const About = {
        view: (ctrl) =>
            m('div.application-container',
                m('div.not-the-footer-container',
                    m(Header),
                    m('main', 'hello'
                    )
                ),
                m(Footer)
            )
    }

    m.route(document.body, '/', {
        '/': App,
        '/about': About,
        '/search/:searchQuery': App
    })
})