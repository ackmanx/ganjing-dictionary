const m = require('mithril')

const AppModel = require('../../model/AppModel')
const Header = require('../Header')
const ActionBar = require('../actionBar/ActionBar')
const Results = require('../Results')
const Footer = require('../Footer')

const SearchPage = {
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

module.exports = SearchPage