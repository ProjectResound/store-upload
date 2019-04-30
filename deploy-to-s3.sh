#!/bin/bash

echo -e ' _______  _______  _______  _______           _        ______
(  ____ )(  ____ \(  ____ \(  ___  )|\     /|( (    /|(  __  \
| (    )|| (    \/| (    \/| (   ) || )   ( ||  \  ( || (  \  )
| (____)|| (__    | (_____ | |   | || |   | ||   \ | || |   ) |
|     __)|  __)   (_____  )| |   | || |   | || (\ \) || |   | |
| (\ (   | (            ) || |   | || |   | || | \   || |   ) |
| ) \ \__| (____/\/\____) || (___) || (___) || )  \  || (__/  )
|/   \__/(_______/\_______)(_______)(_______)|/    )_)(______/

 ______   _______  _______  _        _______
(  __  \ (  ____ \(  ____ )( \      (  ___  )|\     /|
| (  \  )| (    \/| (    )|| (      | (   ) |( \   / )
| |   ) || (__    | (____)|| |      | |   | | \ (_) /
| |   | ||  __)   |  _____)| |      | |   | |  \   /
| |   ) || (      | (      | |      | |   | |   ) (
| (__/  )| (____/\| )      | (____/\| (___) |   | |
(______/ (_______/|/       (_______/(_______)   \_/
'

read -p 'Which .env file should I read? (example: .env.staging): ' env_file
export $(cat $env_file)
echo s3 bucket: $S3_BUCKET
echo auth0 domain: $AUTH0_DOMAIN
echo auth0 client id: $AUTH0_CLIENT_ID
echo auth0 callback url: $AUTH0_CALLBACK_URL
echo Resound API url: $RESOUND_API_URL
echo Resound Websocket url: $RESOUND_WS_URL

read -p 'Is this correct? (Y/n): ' -n 1 -r

if ! [[ $REPLY =~ ^[Yy]$ ]]
then
    echo
    echo 'Toodle-loo (that means bye)!'
    exit 1
fi

echo
echo "Running 'yarn build'..."
yarn build


echo
echo Copying /dist directory into /tmp...
mkdir -p tmp
cp -a ./dist/. ./tmp
sed -i '.bak' "s#MAGICSTRING_AUTH0_DOMAIN#$AUTH0_DOMAIN#g" tmp/scripts/bundle.js
sed -i '.bak' "s#MAGICSTRING_AUTH0_CLIENT_ID#$AUTH0_CLIENT_ID#g" tmp/scripts/bundle.js
sed -i '.bak' "s#MAGICSTRING_AUTH0_CALLBACK_URL#$AUTH0_CALLBACK_URL#g" tmp/scripts/bundle.js
sed -i '.bak' "s#MAGICSTRING_AUTH0_AUDIENCE#$AUTH0_AUDIENCE_URL#g" tmp/scripts/bundle.js
sed -i '.bak' "s#MAGICSTRING_HONEYBADGER_KEY#$HONEYBADGER_CLIENT_KEY#g" tmp/scripts/bundle.js
sed -i '.bak' "s|http://localhost:3000|$RESOUND_API_URL|g" tmp/scripts/bundle.js
sed -i '.bak' "s|ws://localhost:3000|$RESOUND_WS_URL|g" tmp/scripts/bundle.js
sed -i '.bak' "s|http://localhost:3001|$cms_url|g" tmp/scripts/bundle.js

rm tmp/scripts/bundle.js.bak

echo Copying /tmp into S3...
aws s3 sync tmp $S3_BUCKET

echo Cleaning /tmp...
rm -rf tmp

echo 'DONE!'

