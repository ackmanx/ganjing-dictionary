define(function (require) {

    const m = require('mithril')
    const Entry = require('Entry')

    return {
        controller: function (args) {
            this.am = args.am
            this.hskSearch = () => {
                const hskOnly = this.am.hskOnly(!this.am.hskOnly())
                Entry.search(this.am.query(), hskOnly).then(this.am.results)
            }
        },
        view: (ctrl) =>
            m('div',
                m('label.switch', {
                        onchange: ctrl.hskSearch
                    },
                    m('input[type=checkbox]'),
                    m('div.slider')
                ),
                m('span', 'HSK Only')
            )
    }
})
