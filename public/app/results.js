define(function (require) {

    const m = require('mithril')

    return {
        controller: function (args) {
            this.am = args.am
        },
        view: (ctrl) =>
            m('section#results-list',
                ctrl.am.results().length ? m('div.results-counter', `${ctrl.am.results().length} results`) : '',
                ctrl.am.results().map((entry) =>
                    m('div.listing',
                        m('div.simplified-col', entry.simplified()),
                        m('div.pinyin-col', entry.pinyin()),
                        m('div.english-col',
                            m('ol',
                                entry.english().map((it) => m('li', it))
                            )
                        ),
                        entry.hsk() ? m('div.hsk-col', `HSK ${entry.hsk()}`) : ''
                    )
                )
            )
    }
})