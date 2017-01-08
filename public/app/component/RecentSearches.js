define(function (require) {

    const m = require('mithril')
    const storage = require('localStorage')

    return {
        controller: function (args) {
            this.recentSearches = storage.getRecents
        },
        view: (ctrl) =>
            m('select.button',
                {
                    title: 'zuìjìn sōusuǒ',
                    onchange: event => m.route('/' + event.target.value)
                },
                m('option', {
                    disabled: true,
                    selected: true,
                    hidden: true
                }, '最近搜索'),
                ctrl.recentSearches().reverse().map(search =>
                    m('option', {value: search}, search)
                )
            )
    }
})