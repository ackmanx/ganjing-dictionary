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
            this.currentLevel = m.prop(0)
            this.query = args.query
            this.nextHskLevel = () => {
                this.currentLevel(this.currentLevel() + 1 < LEVELS.length ? this.currentLevel() + 1 : 0)
                if (!this.currentLevel())
                    Entry.search(this.query()).then(args.results)
                else
                    Entry.hskSearch(this.currentLevel(), this.query()).then(args.results)
            }
        },
        view: (ctrl) =>
            m('button.hsk', {
                    onclick: ctrl.nextHskLevel
                },
                LEVELS[ctrl.currentLevel()])
    }
})