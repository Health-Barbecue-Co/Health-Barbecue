# Health-Barbecue

## Requirements

Required to launch the global application:
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [DOTNet Core 3.xx](https://dotnet.microsoft.com/download)

### Requirements on Windows

For Docker:

- Windows 10 64-bit: Pro, Enterprise, or Education (Build 15063 or later).
- Hyper-V and Containers Windows features must be enabled.

#### System Requirements:

The following hardware prerequisites are required to successfully run Client Hyper-V on Windows 10:
-64 bit processor with Second Level Address Translation (SLAT)
-4GB system RAM
-BIOS-level hardware virtualization support must be enabled in the BIOS settings. For more information, see Virtualization.

### Requirements on macOS

On macOS, specific steps are needed to install Docker, Docker Compose and the .NET Core SDK.

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

Then, proceed with the Install step below.

## Install

to Install all the stack, the command below should be executed in the root folder:

```shell
docker-compose -f "docker-compose.yml" up -d --build
```

P.S. If the kind of error "no matching manifest for windows/amd64 in the manifest list entries" occurs, switch to **Linux container** in Docker Desktop.

## Usage

### Orthanc Server

Once Orthanc is running, use Mozilla Firefox at URL <http://localhost:8042/> to interact with Orthanc. The default username is `barbecuehealth` and its password is `barbecuehealth`.

To change the login/password, edit file `config/orthanc.json` and add a new login into `RegisteredUsers`.

### Mongo Database

A web Mongo client being available on the stack, simply use <http://localhost:8043/> to access MongoDB.

### Web Client

It is developed in React TypeScript, and Yarn is used as the package manager/CLI.

#### Requirement

The following tools are needed for development:

- [Node.js](https://nodejs.org/en/) >= 12
- [Yarn](https://classic.yarnpkg.com/lang/en/) ~1.20

On macOS, these tools can be installed with Homebrew, by running the command `brew install yarn`.

#### Docker

It is available on <http://localhost:4000/>.

#### Locally

The web client can be ran locally with the commands:

```bash
cd client/web
yarn && yarn start
```

The application will be available on <http://localhost:3000/>.

## Development

### Business

#### Requirement

#### Build on macOS

Run the commands:

```sh
cd business/MetadataDatabase
dotnet restore
dotnet msbuild .
```

#### Build on Windows/Linux

Run the commands:

```sh
cd business/MetadataDatabase
dotnet run
```
