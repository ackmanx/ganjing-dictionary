define(function (require) {

    const m = require('mithril')
    const Entry = require('Entry')
    const hsk = require('hsk')

    return {
        controller: function (args) {
            this.am = args.am
            this.performSearch = () => {
                Entry.search(this.am).then(this.am.results)
            }
        },
        view: (ctrl) =>
            m('div.action-bar',
                m('input[type=text]#searchBar', {
                    autofocus: true,
                    oninput: m.withAttr('value', ctrl.am.query),
                    onkeyup: event => {
                        if (event.keyCode == ESC)
                            ctrl.am.query('')
                        else if (event.keyCode == ENTER)
                            ctrl.performSearch()
                    },
                    value: ctrl.am.query()
                }),
                m('button.search', {onclick: ctrl.performSearch}, '中文'),
                m(hsk, {am: ctrl.am})
            )
    }
})