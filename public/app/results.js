define(function (require) {

    const m = require('mithril')

    return {
        controller: function (args) {
            this.am = args.am
        },
        view: (ctrl) =>
            m('div#results-list',
                ctrl.am.results().length ? m('div.results-counter', `${ctrl.am.results().length} results`) : '',
                ctrl.am.results().map((entry) =>
                    m('div.listing',
                        m('span.simplified-col', entry.simplified()),
                        m('span.pinyin-col', entry.pinyin()),
                        m('ol.english-col',
                            entry.english().map((it) => m('li', it))
                        ),
                        entry.hsk() ? m('span.hsk-col', `HSK ${entry.hsk()}`) : ''
                    )
                )
            )
    }
})