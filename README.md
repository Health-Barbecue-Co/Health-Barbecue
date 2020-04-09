# Health-Barbecue

## Pre-requirement

To launch the global application, you need:
- docker [https://www.docker.com/](https://www.docker.com/)
- docker-compose [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

## Requirements on macOS

For Docker, you'll need:

- Computer: Mac >= 2010
- OS: macOS >= 10.13
- RAM: 4 GB
- VirtualBox prior to version 4.3.30 MUST NOT be installed

Setup:

1. [optional] [Homebrew](https://brew.sh)
2. Install Docker (e.g. with Homebrew: `brew cask install docker`)
3. Run `open /Applications/Docker.app`

You can then proceed with the *Install* step below.

## Install

to Install all the stack, you should execute into the root folder the line below:

```shell
docker-compose -f "docker-compose.yml" up -d --build
```

## Usage

### Orthanc server

Once Orthanc is running, use Mozilla Firefox at URL [http://localhost:8042/](http://localhost:8042/) to interact with Orthanc. The default username is `barbecuehealth` and its password is `barbecuehealth`.

If you want to change login/password, edit file `config/orthanc.json` and add your new login into RegisteredUsers

### Mongo Database

A web Mongo client is available on the stack, you just need to use [http://localhost:8043/](http://localhost:8043/) to access MongoDB.

### Web client

It is developed in React TypeScript

#### Docker

It is available on [http://localhost:4000/](http://localhost:4000/)

#### Locally

you can run locally with the command:

```bash
cd ./client/web
npm install && npm start
```

The application will be available on [http://localhost:3000](http://localhost:3000)
