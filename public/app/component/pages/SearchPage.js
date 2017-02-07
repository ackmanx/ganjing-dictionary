define(function (require) {

    const m = require('mithril')

    const AppModel = require('model/AppModel')

    const Header = require('component/Header')
    const ActionBar = require('component/actionBar/ActionBar')
    const Results = require('component/Results')
    const Footer = require('component/Footer')

    return {
        controller: function () {
            this.am = new AppModel({
                query: m.route.param('searchQuery')
            })
        },
        view: ctrl =>
            m('div.application-container',
                m('div.not-the-footer-container',
                    m(Header),
                    m('main.search-page',
                        m(ActionBar, {am: ctrl.am}),
                        m(Results, {am: ctrl.am})
                    )
                ),
                m(Footer)
            )
    }
})