define(function (require) {

    const m = require('mithril')

    const Header = require('component/Header')
    const Footer = require('component/Footer')

    return {
        view: ctrl =>
            m('div.application-container',
                m('div.not-the-footer-container',
                    m(Header),
                    m('main', 'Put something here!!!')
                ),
                m(Footer)
            )
    }
})