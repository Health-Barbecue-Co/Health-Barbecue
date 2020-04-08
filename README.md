# Health-Barbecue

## Pre-requirement

To launch the global application, you need:
- docker
- docker-compose

## Install

to Install all the stack, you should execute into the root folder the line below:

```shell
docker-compose -f "docker-compose.yml" up -d --build
```

## Usage

### Orthanc server

Once Orthanc is running, use Mozilla Firefox at URL [http://localhost:8042/]() to interact with Orthanc. The default username is `barbecuehealth` and its password is `barbecuehealth`.

If you want to change login/password, edit file `config/orthanc.json` and add your new login into RegisteredUsers
