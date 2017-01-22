define(function (require) {

    const m = require('mithril')

    return {
        view: ctrl =>
            m('header',
                m('a[href=/]', {config: m.route},
                    m('h1', '干净 gānjìng')
                )
            )
    }
})