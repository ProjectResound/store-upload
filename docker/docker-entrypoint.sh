#!/bin/bash
sed -i "s#MAGICSTRING_AUTH0_DOMAIN#$AUTH0_DOMAIN#g" /usr/share/nginx/html/scripts/bundle.js
sed -i "s#MAGICSTRING_AUTH0_CLIENT_ID#$AUTH0_CLIENT_ID#g" /usr/share/nginx/html/scripts/bundle.js
sed -i "s#MAGICSTRING_AUTH0_CALLBACK_URL#$AUTH0_CALLBACK_URL#g" /usr/share/nginx/html/scripts/bundle.js
sed -i "s#MAGICSTRING_AUTH0_AUDIENCE#$AUTH0_AUDIENCE#g" /usr/share/nginx/html/scripts/bundle.js
sed -i "s|http://localhost:3000|http://$RESOUND_API_URL|g" /usr/share/nginx/html/scripts/bundle.js
sed -i "s|ws://localhost:3000|ws://$RESOUND_API_URL|g" /usr/share/nginx/html/scripts/bundle.js

nginx -g 'daemon off;' -c /usr/share/nginx/nginx.conf -p /usr/share/nginx/html