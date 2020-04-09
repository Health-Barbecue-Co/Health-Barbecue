# Health-Barbecue

## Requirements

To launch the global application, you need:
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Requirements on macOS

On macOS, you'll need specific steps to install Docker, Docker Compose, and the .NET Core SDK.

For Docker, you'll need:

- Computer: Mac >= 2010
- OS: macOS >= 10.13
- RAM: 4 GB
- VirtualBox prior to version 4.3.30 MUST NOT be installed

Setup:

1. [optional] Install [Homebrew](https://brew.sh) to get all the required tools easily.
2. Install Docker and Docker Compose (e.g. with Homebrew: `brew cask install docker`).
3. Install the [.NET Core SDK](https://dotnet.microsoft.com/download#macos) (e.g. with Homebrew: `brew cask install dotnet-sdk`).
4. Run the command `open /Applications/Docker.app`.

You can then proceed with the *Install* step below.

## Install

to Install all the stack, you should execute into the root folder the line below:

```shell
docker-compose -f "docker-compose.yml" up -d --build
```

P.S. If you have the kind of error "no matching manifest for windows/amd64 in the manifest list entries", switch to **Linux container** in Docker Desktop.

## Usage

### Orthanc Server

Once Orthanc is running, use Mozilla Firefox at URL <http://localhost:8042/> to interact with Orthanc. The default username is `barbecuehealth` and its password is `barbecuehealth`.

If you want to change the login/password, edit the file `config/orthanc.json` and add your new login into `RegisteredUsers`.

### Mongo Database

A web Mongo client is available on the stack, you just need to use <http://localhost:8043/> to access MongoDB.

### Web Client

It is developed in React TypeScript, and Yarn is used as the package manager/CLI.

#### Requirement

To develop, we need following tools:

- [Node.js](https://nodejs.org/en/) >= 12
- [Yarn](https://classic.yarnpkg.com/lang/en/) ~1.20

On macOS, you can install those tools with Homebrew by running the command `brew install yarn`.

#### Docker

It is available on <http://localhost:4000/>.

#### Locally

You can run locally with the command:

```bash
cd client/web
yarn && yarn start
```

The application will be available on <http://localhost:3000/>.

## Development

### Business

#### Requirement

#### Build on macOS

Run the command:

```sh
cd business/MetadataDatabase
dotnet restore
dotnet msbuild .
```
