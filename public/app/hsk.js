define(function (require) {

    const m = require('mithril')

    const LEVELS = [
        'ALL THE WORDS!',
        'HSK 1',
        'HSK 2',
        'HSK 3',
        'HSK 4',
        'HSK 5',
        'HSK 6'
    ]

    return {
        controller: function () {
            this.currentLevel = m.prop(0)
            this.nextHskLevel = () => {
                const nextLevel = this.currentLevel() + 1
                this.currentLevel(nextLevel < LEVELS.length ? nextLevel : 0)
            }
        },
        view: (ctrl) =>
            m('button.hsk', {
                    onclick: ctrl.nextHskLevel
                },
                LEVELS[ctrl.currentLevel()])
    }
})