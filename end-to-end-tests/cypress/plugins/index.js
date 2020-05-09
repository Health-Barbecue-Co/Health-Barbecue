/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const mongoose = require('mongoose');

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  mongoose.connect(`${process.env.dbUrl}/healthbarbecue`, {useUnifiedTopology: true, useNewUrlParser: true})
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('task', {
    cleanTable (collection) {
      return new Promise(resolve => {
       const col = mongoose.connection.collection(collection);
       col.deleteMany({});
       resolve(null);
      })
    }
  })
};
