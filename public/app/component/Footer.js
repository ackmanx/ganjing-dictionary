define(function (require) {

    const m = require('mithril')

    return {
        view: ctrl =>
            m('footer',
                m('a[href="?/about"]', 'About')
            )
    }
})