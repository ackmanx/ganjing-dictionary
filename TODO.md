#Left Off
* 3 Favorite search entries
    * Requires... Star icon. New view. Local storage.

#Future Fun
* 4 Migrate to MongoDB
* 3 Paging (dependent on MongoDB)
* 3 More frequently used characters/words should have higher relevence
* 2 Highlight search hits
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

#Heroku Setup
* Need environment variable, which Heroku calls Config Variables
    * DEBUG=Chinese:*
    * NODE_ENV=production
* MongoDB add on
* Custom Domain
    * Domain Name: ganjing-hoho.com
    * DNS Target: ganjing.herokuapp.com
    * Domain Name: www.ganjing-hoho.com
    * DNS Target: ganjing.herokuapp.com