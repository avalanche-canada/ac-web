'use strict';

module.exports = function(app) {

    var env = app.get('env');

    //! prerender site for bots in production only
    if (env === 'production') {
        app.use(require('prerender-node').set('prerenderToken', '02L7Pq1BhiL3t6gzWX78'));
    }

    app.use('/api/forecasts', require('./api/forecasts'));
    app.use('/api/min', require('./api/observations'));

    app.use(function (err, req, res, next) {
        if (err.name === 'UnauthorizedError') {
            res.send(401, 'invalid token...');
        }
    });

    // All undefined asset or api routes should return a 404
    app.route('/:url(api|auth|components|app|bower_components|assets)/*')
        .get(function(req, res) {
            res.send(404);
        });


    // All other routes should redirect to the index.html
    app.route('/*')
        .get(function(req, res) {
            res.sendfile(app.get('appPath') + '/index.html');
        });
};
