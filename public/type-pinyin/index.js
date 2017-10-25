const storage = require('./storage')
const convertToneNumbersToAccents = require('./convert-accents')
const jQuery = require('jquery')

let $tabContainer

document.addEventListener('DOMContentLoaded', () => {
    const selectedTab = storage.getSelectedTab()
    const tabsCount = storage.getNumberTabs()
    $tabContainer = jQuery('.tab-container')

    for (let i = 0; i < tabsCount; i++) {
        const $nav = jQuery('<nav>').addClass('nav').text(`Tab ${i + 1}`)
        if (i === selectedTab) {
            $nav.addClass('selected-tab')
            storage.setSelectedTab(i)
        }
        $nav.on('click', selectTab)
        $tabContainer.append($nav)
    }

    const $addTab = jQuery('<nav>').addClass('add-tab nav').text('+')
    $addTab.on('click', createNewTab)
    $tabContainer.append($addTab)

    const $textarea = jQuery('textarea')
    $textarea.val(storage.getTab(selectedTab))
    $textarea.focus()
})

document.getElementById('textarea').addEventListener('keyup', () => {
    const textarea = document.getElementById('textarea')
    textarea.value = convertToneNumbersToAccents(textarea.value)
    storage.updateTab(storage.getTabIndex(), textarea.value)
})

function createNewTab(event, title) {
    const $nav = jQuery('<nav>').addClass('nav').text(title || 'Tab X')
    $nav.on('click', selectTab)
    $tabContainer.append($nav)
}

function selectTab(event) {
    const $nav = jQuery(event.target)
    jQuery('.selected-tab').removeClass('selected-tab')
    $nav.addClass('selected-tab')
}