FROM cypress/included:4.5.0

WORKDIR /scripts
COPY docker-script.sh .
RUN chmod +x docker-script.sh

WORKDIR /app

# dependencies will be installed only if the package files change
COPY package.json .
COPY yarn.lock .

RUN yarn install

# by setting CI environment variable we switch the Cypress install messages
# to small "started / finished" and avoid 1000s of lines of progress messages
# https://github.com/cypress-io/cypress/issues/1243
ENV CI=1
# RUN yarn ci
# verify that Cypress has been installed correctly.
# running this command separately from "cypress run" will also cache its result
# to avoid verifying again when running the tests
RUN ls -la

RUN npx cypress verify

ENTRYPOINT [ "/scripts/docker-script.sh" ]