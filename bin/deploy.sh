#!/usr/bin/env bash

# Usage:
# deploy.sh OR deploy.sh <branch_name>

if [[ ! -e www.js ]]; then
    echo "Please run from bin"
    exit
fi


cyan=\\e[96m
default=\\e[39m

echo ------------------------------------------------------------
echo 'Generating new version number'
echo ------------------------------------------------------------

branch=`git branch | grep \* | awk '{print $2}'`
version=`cat ../VERSION | cut -d '#' -f2`
version=$((version + 1))
date=`date`

printf "$branch#$version#$date" > ../VERSION

git reset HEAD --
git add ../VERSION
git commit -m "Version++"

echo ''

echo ------------------------------------------------------------
echo 'Deploying'
echo ------------------------------------------------------------

#Push master to Heroku unless the user supplies a local branch name to push instead
if [[ -z $1 ]]; then
    printf "Deploying ${cyan}master ${default}to ${cyan}Heroku ${default}\n\n"
    git push -f heroku master
else
    printf "Deploying ${cyan}branch $1 ${default}to ${cyan}Heroku ${default}\n\n"
    git push -f heroku $1:master
fi
