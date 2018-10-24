# Resound: Store + Manage [![CircleCI](https://circleci.com/gh/ProjectResound/store-upload.svg?style=svg)](https://circleci.com/gh/ProjectResound/store-upload)

The client-facing part of audio uploading. For quick setup, see [Docker](https://github.com/ProjectResound/planning/wiki/store#docker-deployment) instructions.

The javascript takes a large audio file and uploads it in chunks to the server.  The uploading process can be paused
and resumed.

[More info in the wiki](https://github.com/ProjectResound/planning/wiki)


## Requirements
* node
* nginx

## Development
* copy `.env.example` to `.env` and add in the relevant environment variables
* `yarn start` to start webpack and watch for file changes

## Multi Tenant
You need to setup a custom rule on your Auth0 account, check the file `/src/auth_rule.js` for more informations.

## Docker deployment
* run `yarn build` to build with production configs
* `docker build -f docker/Dockerfile . -t scprdev/resound-store-manage`

## Heroku
1. Copy all the variables from `.env.example` to `Config Vars` under `settings` tab and add the proper values
2. The value for `API_URL`, should be the url for `resound-api` heroku app, following by `/api/v1`.
Example: `https://resound-api-domain.com/api/v1`
3. The value for `WS_URL`, should be the url for `resound-api` heroku app, following by `/cable` and using the protocol `wss`.
Example: `wss://resound-api-domain.com/cable`
