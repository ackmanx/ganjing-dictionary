define(function (require) {

    const m = require('mithril')

    return {
        controller: function (args) {
            this.am = args.am
        },
        view: (ctrl) =>
            m('span.results',
                ctrl.am.results().length ? m('div.results-counter', `${ctrl.am.results().length} results`) : '',
                ctrl.am.results().map((result) =>
                    m('div.listing',
                        m('span.simplified', result.simplified()),
                        m('span.pinyin', result.pinyin()),
                        m('span.hsk', result.hsk()),
                        m('ul.english',
                            result.english().map((it) => m('li', it))
                        )
                    )
                )
            )
    }
})