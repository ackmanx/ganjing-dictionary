define(function (require) {

    const m = require('mithril')

    const storage = require('localStorage')
    const Entry = require('model/Entry')

    const Hsk = require('component/actionBar/Hsk')
    const RecentSearches = require('component/actionBar/RecentSearches')

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
            }

            //On load of this component, check if we already have a query set
            //This is because searches are performed by a URL change (route)
            if (this.am.query()) {
                this.performSearch()
            }
        },
        view: ctrl =>
            m('div.action-bar',
                m('input[type=text]#searchBar.search-bar', {
                    oninput: m.withAttr('value', ctrl.am.query),
                    onkeyup: event => {
                        if (event.keyCode === ESC)
                            ctrl.am.query('')
                        else if (event.keyCode === ENTER)
                            m.route('/search/' + ctrl.am.query())
                    },
                    config: function (el) {
                        //We don't focus the input if on small view
                        //It is likely the user is on a mobile device and the keyboard gets in the way of results
                        if (!window.IS_SMALL_VIEW) {
                            el.focus()
                        }
                    },
                    value: ctrl.am.query()
                }),
                m('div.button-container',
                    m('button.button.search', {onclick: () => m.route('/search/' + ctrl.am.query())}, '中文'),
                    m(RecentSearches),
                    m(Hsk, {am: ctrl.am})
                )
            )
    }
})