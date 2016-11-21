define(function (require) {

    const m = require('mithril')

    return {
        controller: function (args) {
            this.am = args.am
        },
        view: (ctrl) =>
            m('span.results',
                ctrl.am.results().length ? m('div.results-counter', `${ctrl.am.results().length} results`) : '',
                ctrl.am.results().map((entry) =>
                    m('div.listing',
                        m('span.simplified', entry.simplified()),
                        m('span.pinyin', entry.pinyin()),
                        m('ul.english',
                            entry.english().map((it) => m('li', it))
                        ),
                        m('span.badges',
                            entry.hsk() ? m('span.hsk', `HSK ${entry.hsk()}`) : ''
                        )
                    )
                )
            )
    }
})