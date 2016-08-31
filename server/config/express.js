/**
 * Express configuration
 */

'use strict';

var express = require('express');
var favicon = require('static-favicon');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./environment');
var cors = require('cors');



var ROOT = path.normalize(__dirname + '/../..');

module.exports = function(app) {
  var env = app.get('env');

  app.use(cors());
  app.set('views', ROOT + '/server/views');
  app.set('view engine', 'jade');
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  
  if ('production' === env) {
    app.use(favicon(path.join(ROOT, 'public', 'favicon.ico')));
    app.set('appPath', ROOT + '/public');
    app.use(morgan('dev'));
  }

  if ('development' === env || 'test' === env) {
    app.set('appPath', 'client');
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }
};
