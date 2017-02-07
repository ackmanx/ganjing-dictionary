define(function (require) {

    const m = require('mithril')

    const Header = require('component/Header')
    const Footer = require('component/Footer')

    return {
        view: ctrl =>
            m('div.application-container',
                m('div.not-the-footer-container',
                    m(Header),
                    m('main.about-page',
                        m('h3', 'Purpose'),
                        m('p',
                            'This site was created to have a clean, minimal dictionary available for me to use while learning Chinese. ' +
                            'I wanted something that would work on my computers and mobile devices, all without distractions.'
                        ),
                        m('h3', 'A Note About HSK'),
                        m('p',
                            'It is difficult to correctly identify which characters/phrases are HSK-intended. ' +
                            'The official lists do not specify which definition applies, therefore interpretation is required. ' +
                            'As an example, 三 is listed as HSK 1, but also has two dictionary entries (the number 3 and the last name San).',
                            m('br'), m('br'),
                            'In an attempt to keep out false HSK markings, I used HSK English translations to help determine if a dictionary entry would be interpreted as HSK for a given definition.'
                        ),
                        m('h3', 'Thanks'),
                        m('p',
                            'None of this could be possible without MDBG providing their dictionary for free.',
                            m('ul',
                                m('li',
                                    m('a[href="https://www.mdbg.net/chindict/chindict.php?page=cc-cedict"]', 'https://www.mdbg.net/chindict/chindict.php?page=cc-cedict')
                                )
                            )
                        ),
                        m('br'),
                        m('p',
                            'I also used the wonderful HSK lists provided by HSK东西.',
                            m('ul',
                                m('li',
                                    m('a[href="http://www.hskhsk.com/word-lists.html"]', 'http://www.hskhsk.com/word-lists.html')
                                )
                            )
                        )
                    )
                ),
                m(Footer)
            )
    }
})