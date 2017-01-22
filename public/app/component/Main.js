window.ESC = 27
window.ENTER = 13
window.GANJING_TITLE_PREFIX = '干净 gānjìng'
window.IS_SMALL_VIEW = window.matchMedia('(max-width: 550px)').matches

define(function (require) {

    const m = require('mithril')

    const SearchPage = require('component/pages/SearchPage')
    const AboutPage = require('component/pages/AboutPage')

    m.route(document.body, '/', {
        '/': SearchPage,
        '/about': AboutPage,
        '/search/:searchQuery': SearchPage
    })
})