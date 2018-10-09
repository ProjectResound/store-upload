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

## Docker deployment
* run `yarn build` to build with production configs
* `docker build -f docker/Dockerfile . -t scprdev/resound-store-manage`
