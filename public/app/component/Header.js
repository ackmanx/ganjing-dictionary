define(function (require) {

    const m = require('mithril')

    return {
        view: ctrl =>
            m('header',
                m('a[href=/]', m('h1', '干净 gānjìng'))
            )
    }
})