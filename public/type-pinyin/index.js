const storage = require('./storage')
const convertToneNumbersToAccents = require('./convert-accents')

document.addEventListener('DOMContentLoaded', () => {
    const selectedTab = storage.getSelectedTab()
    const num = storage.getNumberTabs()

    for (let i = 0; i < num; i++) {
        const nav = document.createElement('nav')
        nav.appendChild(document.createTextNode('Tab ' + (i + 1)))
        if (i === selectedTab) {
            nav.classList.add('selected-tab')
        }
        document.querySelector('.tab-container').appendChild(nav)
    }

    const navAddTab = document.createElement('nav')
    navAddTab.appendChild(document.createTextNode('+'))
    navAddTab.classList.add('add-tab')
    document.querySelector('.tab-container').appendChild(navAddTab)

    const textarea = document.getElementById('textarea')
    const savedText = storage.getTab(selectedTab)
    if (savedText) {
        textarea.value = savedText
    }
    textarea.focus()
})

document.getElementById('textarea').addEventListener('keyup', () => {
    const textarea = document.getElementById('textarea')
    textarea.value = convertToneNumbersToAccents(textarea.value)
    storage.updateTab(storage.getTabIndex(), textarea.value)
})
