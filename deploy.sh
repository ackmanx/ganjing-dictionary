#!/usr/bin/env bash

cyan=\\e[96m
default=\\e[39m

#Push master to Heroku unless the user supplies a local branch name to push instead
if [[ -z $1 ]]; then
    printf "Deploying ${cyan}master ${default}to ${cyan}Heroku ${default}\n"
    git push -f heroku master
else
    printf "Deploying ${cyan}branch $1 ${default}to ${cyan}Heroku ${default}\n"
    git push -f heroku $1:master
fi
