const m = require('mithril')

const Listing = {
    controller: function (args) {
        this.entry = args.entry
    },
    view: ctrl =>
        m('div.listing',
            m('div.simplified-col', ctrl.entry.simplified()),
            m('div.pinyin-col', ctrl.entry.pinyin()),
            m('div.english-col',
                m('ol',
                    ctrl.entry.english().map((it) => m('li', it))
                )
            ),
            m('div.hsk-col', ctrl.entry.hsk() ? `HSK ${ctrl.entry.hsk()}` : '')
        )
}

module.exports = Listing