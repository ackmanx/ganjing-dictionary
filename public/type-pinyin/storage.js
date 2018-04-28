const BASE = 'type-pinyin'

const storageHelper = {
    getSelectedTab: () => Number.parseInt(localStorage.getItem(`${BASE}__selected-tab`)) || 0,
    setSelectedTab: (index) => localStorage.setItem(`${BASE}__selected-tab`, index),

    getTab: (index) => storageHelper.getTabs()[index],
    getNumberTabs: () => storageHelper.getTabs().length || 1,
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

    updateTab: (index, text) => {
        const allTabs = storageHelper.getTabs()
        allTabs[index] = text
        localStorage.setItem(`${BASE}__tabs`, JSON.stringify(allTabs))

        const options = {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(allTabs)
        }
        fetch('http://localhost:3000/save', options)
            .catch(err => console.error(err))
    },

    syncWithServer: () => {
        fetch('http://localhost:3000/get')
            .then(result => result.json())
            .then(json => localStorage.setItem(`${BASE}__tabs`, JSON.stringify(json)))
    }
}

module.exports = storageHelper
