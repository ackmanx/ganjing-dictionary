require.config({
    baseUrl: 'app',
    /*
     * Paths config is required for libraries because they are outside of baseUrl
     * Paths are relative to the baseUrl
     */
    paths: {
        moment: '../lib/moment',
        underscore: '../lib/underscore-min',
        mithril: '../lib/mithril',
        jquery: '../lib/jquery-min'
    }
})

//Load the main app module to start the app
//Note we are using modules named by convention, not configuration
//This module is unnamed but will reside in the folder app and be in file main.js
require(['App'])
