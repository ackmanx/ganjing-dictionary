define(function (require) {

    const m = require('mithril')

    const ESC = 27
    const ENTER = 13

    const Entry = function (data) {
        this.simplified = m.prop(data.simplified || '')
        this.pinyin = m.prop(data.pinyin || '')
        this.english = m.prop(data.english || [])
        this.hsk = m.prop(data.hsk || '')
    }

    const app = {
        controller: function () {
            this.query = m.prop('')
            this.results = m.prop([])
            this.performSearch = () => {
                m.request({method: 'GET', url: `/search/${this.query()}`, type: Entry}).then(this.results)
            }
        },
        view: (ctrl) =>
            //todo: add diff components for results and search bar
            m('div#searchBarContainer',
                m('button.hsk', 'HSK 1'),
                m('input[type=text]#searchBar', {
                    oninput: m.withAttr('value', ctrl.query),
                    onkeyup: event => {
                        if (event.keyCode == ESC)
                            ctrl.query('')
                        else if (event.keyCode == ENTER)
                            ctrl.performSearch()
                    },
                    value: ctrl.query()
                }),
                m('button.search', 'En'),
                ctrl.results().map((result) => m('p',
                    m('div', result.simplified()),
                    m('div', result.pinyin()),
                    m('div', result.hsk()),
                    result.english().map((it) => m('div', it))
                ))
            )
    }

    m.mount(document.body, app)
})