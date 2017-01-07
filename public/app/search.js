define(function (require) {

    const m = require('mithril')
    const Entry = require('Entry')
    const hsk = require('hsk')

    return {
        controller: function (args) {
            this.am = args.am
            this.performSearch = () => {
                document.title = `${window.GANJING_TITLE_PREFIX} - ${this.am.query()}`
                this.am.firstLoad(false)

                //Trigger loading spinner
                this.am.loading(true)
                this.am.results([])

                Entry.search(this.am).then((results) => {
                    this.am.results(results)
                    this.am.loading(false)
                    //Because search is a background request, mithril doesn't redraw automatically on changing the model in this callback
                    m.redraw()
                })

                //So user can scroll via arrow keys after results come in
                document.getElementById('searchBar').blur()
            }
        },
        view: (ctrl) =>
            m('div.action-bar',
                m('input[type=text]#searchBar', {
                    autofocus: true,
                    oninput: m.withAttr('value', ctrl.am.query),
                    onkeyup: event => {
                        if (event.keyCode === ESC)
                            ctrl.am.query('')
                        else if (event.keyCode === ENTER)
                            ctrl.performSearch()
                    },
                    value: ctrl.am.query()
                }),
                m('button.search', {onclick: ctrl.performSearch}, '中文'),
                m(hsk, {am: ctrl.am})
            )
    }
})