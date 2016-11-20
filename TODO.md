#Left Off
* Allow whitelisted 1 letter words
* Sort results by relevance
    * Ascending order by distance
    * Ascending order by HSK
* Style results into columns

#Future Fun
* Levenshtein for english
* Specify search language
* Help text on initial page load
* Responsive design gets funky at 900px and below
* Mobile should defocus search input on search so the keyboard goes away
* HSK css animation stalls with large result sets
    * It appears that the animation waits for the response to come back, by then it's too late and it just jumps instead
* About page
    * Credits
    * Contact
    * Total searches count
* Google Analytics for shits and giggles
* Highlight search hits
* Caching?
    * https://github.com/expressjs/serve-static

#Dev Setup
* Need Node 6.9.1
* npm install
* Need environment variable, which can be confused in Run Configuration.
    * DEBUG=Chinese:*
* heroku cli
    * git push heroku master
    * git push heroku othermaster:master
    * heroku logs
    * heroku logs --tail