const storage = require('./storage')
const convertToneNumbersToAccents = require('./convert-accents')
const jQuery = require('jquery')

let $tabContainer

document.addEventListener('DOMContentLoaded', () => {
    const selectedTab = storage.getSelectedTab()
    const tabsCount = storage.getNumberTabs()
    $tabContainer = jQuery('.tab-container')

    for (let i = 0; i < tabsCount; i++) {
        const $nav = jQuery('<nav>').text(`Tab ${i + 1}`)
        if (i === selectedTab) {
            $nav.addClass('selected-tab')
        }
        $tabContainer.append($nav)
    }

    const $addTab = jQuery('<nav>').text('+').addClass('add-tab')
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

function createNewTab(event, title, active) {
    const $nav = jQuery('<nav>').text(title || 'Tab X')
    if (active) {
        jQuery('.selected-tab').removeClass('selected-tab')
        $nav.addClass('selected-tab')
    }
    $tabContainer.append($nav)
}