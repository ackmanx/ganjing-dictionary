const BASE = 'type-pinyin'

const storageHelper = {
    getSelectedTab: () => Number.parseInt(localStorage.getItem(`${BASE}__selected-tab`)) || 0,

    setSelectedTab: (index) => localStorage.setItem(`${BASE}__selected-tab`, index),

    getTab: (index) => storageHelper.getTabs()[index],

    getNumberTabs: () => storageHelper.getTabs().length,

    getTabs: () => {
        try {
            let recents = localStorage.getItem(`${BASE}__tabs`) || '[]'
            return JSON.parse(recents)
        }
        catch (err) {
            console.error(err)
            return []
        }
    },

    getTabIndex: () => localStorage.getItem(`${BASE}__index`) || 0,

    updateTab: (index, text) => {
        const allTabs = storageHelper.getTabs()
        allTabs[index] = text
        localStorage.setItem(`${BASE}__tabs`, JSON.stringify(allTabs))
    }
}

module.exports = storageHelper