#Left Off
* Disallow searching of 1 letter
    Cannot use string length because of chinese characters
    pinyin...
        regex search... notone":"\w"
    english...
        https://en.wiktionary.org/wiki/Category_talk:English_one_letter_words

#Future Fun
* Help text on initial page load
* Responsive design gets funky at 900px and below
* Heroku cli tips
    * git push heroku master
    * git push heroku othermaster:master
    * heroku logs
* Mobile should defocus search input on search so the keyboard goes away
* HSK css animation stalls with large result sets
    * It appears that the animation waits for the response to come back, by then it's too late and it just jumps instead

#Dev Setup
* Need Node 6.9.1
* npm install
* Need environment variable, which can be confused in Run Configuration.
    * DEBUG=Chinese:*
