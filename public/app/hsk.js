define(function (require) {

    const m = require('mithril')
    const Entry = require('Entry')

    const LEVELS = [
        '---',
        'HSK 1',
        'HSK 2',
        'HSK 3',
        'HSK 4',
        'HSK 5',
        'HSK 6'
    ]

    return {
        controller: function (args) {
            this.am = args.am
            this.nextHskLevel = () => {
                this.am.hskLevel(this.am.hskLevel() + 1 < LEVELS.length ? this.am.hskLevel() + 1 : 0)
                Entry.search(this.am.query(), this.am.hskLevel()).then(this.am.results)
            }
        },
        view: (ctrl) =>
            m('button.hsk', {
                    onclick: ctrl.nextHskLevel
                },
                LEVELS[ctrl.am.hskLevel()])
    }
})