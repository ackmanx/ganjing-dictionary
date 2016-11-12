define(function (require) {

    const m = require('mithril')

    return {
        controller: function () {

        },
        view: (ctrl) =>
            m('span',
                m('button.search', '中文'),
                m('button.search', 'Pinyin'),
                m('button.search', 'En')
            )
    }
})