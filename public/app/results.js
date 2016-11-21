define(function (require) {

    const m = require('mithril')

    return {
        controller: function (args) {
            this.am = args.am
        },
        view: (ctrl) =>
            m('span',
                ctrl.am.results().length ? m('div.results-counter', `${ctrl.am.results().length} results`) : '',
                ctrl.am.results().map((result) => m('div.listing',
                    m('span', result.simplified()),
                    m('span', `pinyin: ${result.pinyin()}`),
                    m('span', `hsk: ${result.hsk()}`),
                    m('span', `distance: ${result.distance()}`),
                    result.english().map((it) => m('span', it))
                ))
            )
    }
})