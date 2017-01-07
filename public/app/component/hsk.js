define(function (require) {

    const m = require('mithril')
    const Entry = require('model/Entry')

    return {
        controller: function (args) {
            this.am = args.am
            /*
             * Intentionally not using route for hsk filtering because...
              *  - extreme pains with the Mithril rendering the correct state (even when hskOnly is false, it renders true)
              *  - loss of cute animation when turning it on because routes cause complete DOM rebuilding in Mithril 0.2.x
             */
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
