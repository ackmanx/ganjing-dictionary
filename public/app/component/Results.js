define(function (require) {

    const m = require('mithril')
    const Listing = require('component/Listing')

    return {
        controller: function (args) {
            this.am = args.am
        },
        view: ctrl =>
            ctrl.am.loading() ?
                m('div.loader', 'Loading') :
                m('section.results-list',
                    ctrl.am.results().length ? m('div.results-counter', `${ctrl.am.results().length} results`) : '',
                    ctrl.am.results().length ?
                        ctrl.am.results().map((entry) =>
                            m(Listing, {entry: entry})
                        ) :
                        ctrl.am.firstLoad() ? '' : m('div.no-results', 'No results found')
                )

    }
})