const m = require('mithril')

const storage = require('../../localStorage')

const RecentSearches = {
    controller: function (args) {
        this.recentSearches = storage.getRecents
    },
    view: ctrl =>
        m('select.button.recent-searches',
            {
                title: 'lì shǐ',
                onchange: event => m.route('/search/' + event.target.value)
            },
            m('option', {
                disabled: true,
                selected: true,
                hidden: true
            }, '历史'),
            ctrl.recentSearches().reverse().map(search =>
                m('option', {value: search}, search)
            )
        )
}

module.exports = RecentSearches