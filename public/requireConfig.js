require.config({
    baseUrl: 'app',
    /*
     * Paths config is required for libraries because they are outside of baseUrl
     * Paths are relative to the baseUrl
     */
    paths: {
        moment: '../lib/moment-min',
        mithril: '../lib/mithril'
    }
})

//Load the main app module to start the app
//Note we are using modules named by convention, not configuration
//This module is unnamed but will reside in the folder app and be in file Main.js
require(['component/main'])
