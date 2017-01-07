define(function (require) {

    const m = require('mithril')
    const listing = require('listing')

    return {
        controller: function (args) {
            this.am = args.am
        },
        view: (ctrl) =>
            m('section#results-list',
                ctrl.am.loading() ?
                    m('div.loader', 'Loading') : (
                    ctrl.am.results().length ? m('div.results-counter', `${ctrl.am.results().length} results`) : '',
                        ctrl.am.results().length ?
                            ctrl.am.results().map((entry) =>
                                m(listing, {entry: entry})
                            ) :
                            ctrl.am.firstLoad() ? '' : m('div.no-results', 'No results found')
                )
            )
    }
})