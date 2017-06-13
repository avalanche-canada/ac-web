'use strict';

const Raven = require('raven');
var useRaven = false;
if (typeof process.env.SENTRY_DSN !== 'undefined') {
    Raven.config(process.env.SENTRY_DSN).install();
    useRaven = true;
}

module.exports = function(app) {
    var env = app.get('env');
    var logger = require('./logger.js');
    var expressJwt = require('express-jwt');
    var jwt = require('jsonwebtoken');

    var shareRouter = require('./share');

    app.use(shareRouter);

    var secret = new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64');

    app.use('/', require('./favicon'));
    app.use(
        '/api',
        expressJwt({ secret: secret }).unless({ method: ['GET', 'HEAD'] })
    );

    app.use('/api/features', require('./api/features/routes'));
    app.use('/api/forecasts', require('./api/forecasts').router);
    app.use('/api/bulletin-archive', require('./api/bulletin_archive'));
    app.use('/api/hzr', require('./api/hzr'));
    app.use('/api/min', require('./api/observations'));
    app.use('/vendor/cloudinary/', require('./api/proxy'));

    app.use('/basic-html', require('./mobile'));
    app.use('/schema', require('./schema/handlers'));
    app.use('/static', require('./static'));

    //! Error middle ware \todo make this better and inc better logging (winston)
    app.use(function(err, req, res, next) {
        if (err.name === 'UnauthorizedError') {
            logger.warn(
                'UnauthorizedError',
                req.method,
                req.path,
                req.params,
                '--',
                err.code + ':',
                err.message
            );

            var auth = req.get('Authorization');
            if (typeof auth !== 'undefined') {
                logger.warn('Token=' + auth);
            }

            res.status(401).send('UnauthorizedError');
        } else {
            if (useRaven) {
                Raven.captureException(err);
            }
            logger.log(
                'error',
                'Unhandled Error occured in request [' + req.path + ']:',
                err
            );
            if (typeof err.stack !== 'undefined') {
                logger.log(
                    'error',
                    'Unhandled Error occured in request [' +
                        req.path +
                        '] STACK:',
                    JSON.stringify(err.stack)
                );
            }
            res.status(500).send('An Error occured on the server.');
        }
    });
};
