define(function (require) {

    const m = require('mithril')
    const Entry = require('Entry')

    return {
        controller: function (args) {
            this.am = args.am
        },
        view: (ctrl) =>
            m('button.hsk', {
                    onclick: () => console.log('meh')
                },
                'shrug'
            )
    }
})