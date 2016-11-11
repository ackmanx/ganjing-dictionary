define(function (require) {

    const m = require('mithril')

    return {
        controller: function (args) {
            this.query = m.prop('')
            this.performSearch = () => {
                m.request({method: 'GET', url: `/search/${this.query()}`, type: args.Entry}).then(args.results)
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