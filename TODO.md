#Left Off
* 3 Recent Searches dropdown is ugly since I renamed it
    * Safari and FF suck with it in general


#Future Fun
* 4 Migrate to MongoDB
   * MongoDB add on for Heroku
        * Any configuration settings for that
   *  Add drivers to package.json
   *  Require in server bootstrap and configure
   *  Full text search for queries?
   *  Dictionary updates
        * Blow away and start over?
* 3 Paging (dependent on MongoDB)
* 3 More frequently used characters/words should have higher relevence
* 1 Allow idiom searches because edit distance doesn't work there

#Dev Setup
* Need Node 6.9.1
* npm install
* Need environment variable, which can be configured in Run Configuration.
    * DEBUG=Chinese:*
    * NODE_ENV will be set to 'development' automatically by Express if empty
* heroku cli
    * git push heroku master
    * git push heroku othermaster:master
    * heroku logs
    * heroku logs --tail
* MongoDB 3
    * If install via brew, MUST have brew version 1.0 or greater

#To Start
* Start webpack so a bundle is generated
    * npm run-script pack-the-web
* Run bin/www.js with node
    * Pass in environment variable: DEBUG=Chinese:*
    * This is required for debug node module to work

#Heroku Setup
* Need environment variable, which Heroku calls Config Variables
    * DEBUG=Chinese:*
    * NODE_ENV=production
* package.json needs heroku npm script to generate the webpack-bundle
* Custom Domain
    * Domain Name: ganjing-hoho.com
    * DNS Target: ganjing.herokuapp.com
    * Domain Name: www.ganjing-hoho.com
    * DNS Target: ganjing.herokuapp.com