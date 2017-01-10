#Left Off
* 3 Favorite search entries
    * Requires... Star icon. New view. Local storage.

* Restructure LESS so Full Large layout rules aren't mixed with global rules

#Future Fun
* 4 Migrate to MongoDB
* 3 Paging (dependent on MongoDB)
* 3 DB generate script incorrect for HSK
    * Some characters have multiple entries, where not all of the entries are HSK
        * 号 as an example has a HSK 1 entry and a HSK nothing entry
        * My HSK list is character only, so I need to add to that for comparison somehow
* 3 Always auto-focus on input
    * Don't defocus on search? Or did I specifically code to defocus already?
    * Set shortcut to focus?
* 2 Responsive design gets funky at 900px and below
* 2 Highlight search hits
* 2 Allow whitelisted 1 letter words
    * Only English needs to be whitelisted for 1 letter
* 1 Allow idiom searches because edit distance doesn't work there
* 1 HSK css animation stalls with large result sets
    * It appears that the animation waits for the response to come back, by then it's too late and it just jumps instead
* 1 About page
    * Credits
    * Contact
    * Total searches count

#Dev Setup
* Need Node 6.9.1
* npm install
* Need environment variable, which can be configured in Run Configuration.
    * DEBUG=Chinese:*
* heroku cli
    * git push heroku master
    * git push heroku othermaster:master
    * heroku logs
    * heroku logs --tail
* MongoDB 3
    * If install via brew, MUST have brew version 1.0 or greater
