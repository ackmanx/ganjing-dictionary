define(function (require) {

    const m = require('mithril')

    return {
        controller: function (args) {

        },
        view: (ctrl, args) =>
            m('span',
                args.results().map((result) => m('p',
                    m('div', result.simplified()),
                    m('div', result.pinyin()),
                    m('div', result.hsk()),
                    result.english().map((it) => m('div', it))
                ))
            )
    }
})