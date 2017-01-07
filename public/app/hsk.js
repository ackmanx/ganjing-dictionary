define(function (require) {

    const m = require('mithril')
    const Entry = require('Entry')

    return {
        controller: function (args) {
            this.am = args.am
            this.hskSearch = () => {
                this.am.hskOnly(!this.am.hskOnly())
                
                //Trigger loading spinner
                this.am.loading(true)
                this.am.results([])

                Entry.search(this.am).then((results) => {
                    this.am.results(results)
                    this.am.loading(false)
                    //Because search is a background request, mithril doesn't redraw automatically on changing the model in this callback
                    m.redraw()
                })
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
