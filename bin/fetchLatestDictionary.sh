#!/usr/bin/env bash

if [[ ! -e www.js ]]; then
    echo "Please run from bin"
    exit
fi



echo ------------------------------------------------------------
echo 'Getting latest database from MDBG'
echo ------------------------------------------------------------

curl -o ../resources/sourceLists/cedict_1_0_ts_utf-8_mdbg.txt.gz https://www.mdbg.net/chindict/export/cedict/cedict_1_0_ts_utf-8_mdbg.txt.gz


echo ''
echo ------------------------------------------------------------
echo 'Unpacking downloaded database file'
echo ------------------------------------------------------------

gunzip -f -v ../resources/sourceLists/cedict_1_0_ts_utf-8_mdbg.txt.gz

#no need to clean up because gunzip deletes archive after unpacking


echo ''
echo ------------------------------------------------------------
echo 'Generating new databases for application'
echo ------------------------------------------------------------

node generateDatabases.js

#I'm not using these in the application right now but I may later. I do use them to build the uber-hsk.db file.
rm ../resources/hsk1.db
rm ../resources/hsk2.db
rm ../resources/hsk3.db
rm ../resources/hsk4.db
rm ../resources/hsk5.db
rm ../resources/hsk6.db
