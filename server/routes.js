'use strict';

module.exports = function(app) {

    var env = app.get('env');

    //! prerender site for bots in production only
    if (env === 'production') {
        app.use(require('prerender-node').set('prerenderToken', '02L7Pq1BhiL3t6gzWX78'));
    }

    app.use('/api/forecasts', require('./api/forecasts'));
    app.use('/api/min', require('./api/observations'));
    app.use('/api/ast', require('./api/ast'));

    app.use(function (err, req, res, next) {
        if (err.name === 'UnauthorizedError') {
            res.send(401, 'invalid token...');
        }
        else{
            res.status(500);
            res.render('error', { error: err });
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
    app.route(['/','/about*','/more*','/blogs*','/conditions*','/submit*','/share*','/weather*','/training*','/youth*','/gear*','/sponsors*','/forecasts*', '/collaborators*','/news*','/events*','/foundation*', '/spring*'])
        .get(function(req, res) {
            res.sendfile(app.get('appPath') + '/index.html');
        });

    //! for routes not found still use the app but return 404. The app should also not know the route and display the 404 page
    app.use(function(req, res, next) {
        res.status(404);
        res.sendfile(app.get('appPath') + '/index.html');
    });
};
