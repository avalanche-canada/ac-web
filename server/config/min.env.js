'use strict';

// Environment variables that grunt will set when the server starts locally. Use for your api keys, secrets, etc.
// You will need to set these on the server you deploy to.
//
// This file should not be tracked by git.

module.exports = {
  DOMAIN: 'http://avalanche-canada-min.elasticbeanstalk.com',
  SESSION_SECRET: "avalanchecanada-secret",
  // Control debug level for modules using visionmedia/debug
  DEBUG: '',
  imageDir: 'assets/images/',
  MAPBOX_ACCESS_TOKEN :'pk.eyJ1IjoiYXZhbGFuY2hlY2FuYWRhIiwiYSI6Im52VjFlWW8ifQ.-jbec6Q_pA7uRgvVDkXxsA#4',
  MAPBOX_MAP_ID: 'avalanchecanada.k8o347c9',
  AC_API_ROOT_URL: 'http://www.avalanche.ca'
};
