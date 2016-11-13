define(function (require) {

    const m = require('mithril')
    const Entry = require('Entry')

    return {
        controller: function (args) {
            this.query = m.prop('')
            this.performSearch = () => {
                Entry.search(this.query()).then(args.results)
            }
        },
        view: (ctrl) =>
            m('input[type=text]#searchBar', {
                oninput: m.withAttr('value', ctrl.query),
                onkeyup: event => {
                    if (event.keyCode == ESC)
                        ctrl.query('')
                    else if (event.keyCode == ENTER)
                        ctrl.performSearch()
                },
                value: ctrl.query()
            })
    }
})