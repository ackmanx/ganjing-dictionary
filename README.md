#Dev Setup
  * Currently using Node 6.9.1 but not tied to it unless Heroku is
* npm install
* Need environment variable, which can be configured in Run Configuration.
  * DEBUG=Chinese:*
  * NODE_ENV will be set to 'development' automatically by Express if empty
* heroku cli
  * git push heroku master
  * git push heroku othermaster:master
  * heroku logs
  * heroku logs --tail

#To Start
* Start webpack so a bundle is generated
  * npm run-script pack-the-web
  * This will remain in watch mode
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
