# End to End test

You are using cypress.io, and to launch them thanks to docker compose :

## Locally

```bash
# you must run api (with dotnet run) and frontend (with yarn start)
cd end-to-end-tests
yarn cy-open:local

# or
yarn cy-run:local
```

Important : mongoDB must be launched (via docker or locally)

## Docker

```bash
docker-compose -f "docker-compose.ci.yml" up --exit-code-from hb_end_to_end_test
```

## Recommandations

To Find one element of page, it is recommanded to add attribute `data-testid` and use `cy.findByTestId('your_data-testId_element')`
to find it in tests