'use strict';

module.exports = function(app) {

    var env = app.get('env');
    var logger = require('./logger.js');


    var prerenderMiddleware = 
        require('prerender-node')
            .set('prerenderToken', '02L7Pq1BhiL3t6gzWX78')
            .blacklisted(['^/api']);

    app.use(function(req, res, next){
        if(req.hostname === 'avalanche.ca' || req.hostname === 'www.avalanche.ca') {
          prerenderMiddleware(req, res, next);
        } else {
          next();
        }
    });

    var expressJwt = require('express-jwt');
    var jwt = require('jsonwebtoken');

    var secret = new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64');

    app.use('/api', expressJwt({secret: secret}).unless({ method: ['GET', 'HEAD'] }));

    app.use('/api/forecasts', require('./api/forecasts'));
    app.use('/api/min', require('./api/observations'));
    app.use('/api/ast', require('./api/ast'));
    app.use('/vendor/cloudinary/', require('./api/proxy'));

    var geocoder = require('geocoder');


    //! Error middle ware \todo make this better and inc better logging (winston)
    app.use(function (err, req, res, next) {
        if (err.name === 'UnauthorizedError') {

            logger.warn('UnauthorizedError', req.method, req.path, req.params, '--', err.code+':', err.message);

            var auth = req.get('Authorization');
            if(typeof auth !== 'undefined'){
                logger.warn('Token=' + auth);
            }

            res.status(401).send('UnauthorizedError');
        }
        else{
            logger.log('error','Error occured', err);
            res.status(500);
            res.send('error', { error: err });
        }
    });

    // All undefined asset or api routes should return a 404
    app.route('/:url(api|auth|components|app|bower_components|assets)/*')
        .get(function(req, res) {
            res.send(404);
        });

    app.route('/404')
        .get(function(req, res) {
            res.status(404);
            res.sendfile(app.get('appPath') + '/index.html');
        });

    // match routes handled by our app. /todo there must be a better way !
    app.route(['/','/about*','/more*','/blogs*','/conditions*','/submit*','/share*','/weather*','/training*','/youth*','/gear*','/sponsors*','/forecasts*', '/collaborators*','/news*','/events*','/foundation*', '/spring*', '/ast*'])
        .get(function(req, res) {
            res.sendfile(app.get('appPath') + '/index.html');
        });

    //! for routes not found still use the app but return 404. The app should also not know the route and display the 404 page
    app.use(function(req, res, next) {
        res.status(404);
        res.sendfile(app.get('appPath') + '/index.html');
    });
};
