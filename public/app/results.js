define(function (require) {

    const m = require('mithril')

    return {
        controller: function (args) {
            this.am = args.am
        },
        view: (ctrl) =>
            m('span',
                ctrl.am.results().map((result) => m('p',
                    m('div', result.simplified()),
                    m('div', result.pinyin()),
                    m('div', result.hsk()),
                    result.english().map((it) => m('div', it))
                ))
            )
    }
})