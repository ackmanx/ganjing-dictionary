define(function (require) {

    const m = require('mithril')
    const Entry = require('Entry')

    return {
        controller: function (args) {
            this.am = args.am
            this.hskSearch = () => {
                this.am.hskOnly(!this.am.hskOnly())
                Entry.search(this.am).then(this.am.results)
            }
        },
        view: (ctrl) =>
            m('label.switch', {
                    onchange: ctrl.hskSearch
                },
                m('input[type=checkbox]'),
                m('div.slider',
                    m.trust('HSK &nbsp;'),
                    m('span', 'Off')
                )
            )
    }
})
