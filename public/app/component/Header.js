const m = require('mithril')

const Header = {
    view: ctrl =>
        m('header',
            m('a[href=/]', {config: m.route},
                m('h1', '干净 gānjìng')
            )
        )
}

module.exports = Header