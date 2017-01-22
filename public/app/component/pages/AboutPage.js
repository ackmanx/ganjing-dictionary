define(function (require) {

    const m = require('mithril')

    const Header = require('component/Header')
    const Footer = require('component/Footer')

    return {
        view: ctrl =>
            m('div.application-container',
                m('div.not-the-footer-container',
                    m(Header),
                    m('main',
                        m('h3', 'Purpose'),
                        m('p', 'This site was created to have a clean, minimal dictionary available for me to use while learning Chinese. I wanted something that would work on my computers and mobile devices, all without distractions.'),
                        m('h3', 'Thanks'),
                        m('p', 'None of this could be possible without MDBG providing their dictionary for free. You can find it at ', m('a[href="https://www.mdbg.net/chindict/chindict.php?page=cc-cedict"]', 'https://www.mdbg.net/chindict/chindict.php?page=cc-cedict'), '.'),
                        m('br'),
                        m('p', 'I also used the wonderful HSK lists provided by HSK东西. You can find those at ', m('a[href="http://www.hskhsk.com/word-lists.html"]', 'http://www.hskhsk.com/word-lists.html'), '.')
                    )
                ),
                m(Footer)
            )
    }
})