define(function (require) {

    const m = require('mithril')
    const storage = require('localStorage')
    const Entry = require('model/Entry')
    const Hsk = require('component/Hsk')
    const RecentSearches = require('component/RecentSearches')

    return {
        controller: function (args) {
            this.am = args.am
            this.performSearch = () => {
                document.title = `${window.GANJING_TITLE_PREFIX} - ${this.am.query()}`
                this.am.firstLoad(false)

                storage.updateRecents(this.am.query())

                //Trigger loading spinner
                this.am.loading(true)
                this.am.results([])

                Entry.search(this.am).then((results) => {
                    this.am.results(results)
                    this.am.loading(false)
                    //Because search is a background request, mithril doesn't redraw automatically on changing the model in this callback
                    m.redraw()
                })

                //This won't be rendered yet if we are coming from a fresh page load
                const searchBar = document.getElementById('searchBar')
                if (searchBar) {
                    //So user can scroll via arrow keys after results come in
                    document.getElementById('searchBar').blur()
                }
            }
            if (this.am.query()) {
                this.performSearch()
            }
        },
        view: (ctrl) =>
            m('div.action-bar',
                m('input[type=text]#searchBar.search-bar', {
                    autofocus: true,
                    oninput: m.withAttr('value', ctrl.am.query),
                    onkeyup: event => {
                        if (event.keyCode === ESC)
                            ctrl.am.query('')
                        else if (event.keyCode === ENTER)
                            m.route('/' + ctrl.am.query())
                    },
                    value: ctrl.am.query()
                }),
                m('div.button-container',
                    m('button.button.search', {onclick: () => m.route('/' + ctrl.am.query())}, '中文'),
                    m(RecentSearches),
                    m(Hsk, {am: ctrl.am})
                )
            )
    }
})