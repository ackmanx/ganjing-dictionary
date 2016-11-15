define(function (require) {

    const m = require('mithril')
    const Entry = require('Entry')

    return {
        controller: function (args) {
            this.am = args.am
            this.hskSearch = () => {
                Entry.search(this.am.query(), true).then(this.am.results)
            }
        },
        view: (ctrl) =>
            m('button.hsk', {
                    onclick: ctrl.hskSearch
                },
                'shrug'
            )
    }
})