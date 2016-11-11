define(function (require) {

    const m = require('mithril')

    const levels = [
        'All HSK',
        'HSK 1',
        'HSK 2',
        'HSK 3',
        'HSK 4',
        'HSK 5',
        'HSK 6'
    ]

    return {
        controller: function () {
            this.currentLevel= m.prop('All HSK')
        },
        view: (ctrl) =>
            m('button.hsk', ctrl.currentLevel())
    }
})