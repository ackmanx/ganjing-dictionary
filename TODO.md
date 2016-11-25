#Left Off
* Allow whitelisted 1 letter words
* DB generate script incorrect for HSK
    * Some characters have multiple entries, where not all of the entries are HSK
        * 号 as an example has a HSK 1 entry and a HSK nothing entry
* Style results into columns
    * Icon for exact match results

#Future Fun
* History
* Pinyin tones
* Specify search language
* Help text on initial page load
* Responsive design gets funky at 900px and below
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
