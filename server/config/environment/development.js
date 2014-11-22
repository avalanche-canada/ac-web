'use strict';

// Development specific configuration
// ==================================

var dotenv = require('dotenv');
dotenv.load();

module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/avalanchecanada-dev'
  },

  seedDB: true
};
