define(function (require) {

    //todo: maybe this should be a mithril model?
    return {
        getRecents: function () {
            try {
                let recents = localStorage.getItem('recentSearches') || '[]'
                return JSON.parse(recents)
            }
            catch (err) {
                console.error(err)
                console.error('Resetting recent searches due to error')
                return []
            }
        },
        updateRecents: function (query) {
            const recents = this.getRecents()

            if (recents.includes(query)) return

            if (recents.length >= 15) {
                recents.shift()
            }

            recents.push(query)
            localStorage.setItem('recentSearches', JSON.stringify(recents))
        }
    }
})