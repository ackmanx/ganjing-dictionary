const m = require('mithril')

const Footer = {
    view: ctrl =>
        m('footer',
            m('a[href="/about"]', {config: m.route}, 'About')
        )
}

module.exports = Footer