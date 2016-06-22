// TODO: Add all routes from ./routes.js
// TODO: Add the express config
// See code below

const path = require('path')
const express = require('express')
const isDeveloping = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 9000
const app = express()

if (isDeveloping) {
    const webpack = require('webpack')
    const webpackMiddleware = require('webpack-dev-middleware')
    const webpackHotMiddleware = require('webpack-hot-middleware')
    const config = require('../webpack.config.js')
    const compiler = webpack(config)
    const middleware = webpackMiddleware(compiler, {
        publicPath: config.output.publicPath,
        contentBase: 'src',
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false,
        }
    })

    app.use(middleware)
    app.use(webpackHotMiddleware(compiler))
    app.get('*', function response(req, res) {
        const filename = path.resolve(__dirname, '../dist/public/index.html')

        res.write(middleware.fileSystem.readFileSync(filename))
        res.end()
    })
} else {
    app.use(express.static(path.resolve(__dirname, '../dist/public')))

    app.get('*', function response(req, res) {
        res.sendFile(path.resolve(__dirname, '../dist/public/index.html'))
    })
}

app.listen(port, '0.0.0.0', function onStart(err) {
    if (err) {
        console.log(err)
    }
        console.info('==> Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port)
    }
)



// /**
// * Main application file
// */
//
// 'use strict';
//
// // Set default node environment to development
// process.env.NODE_ENV = process.env.NODE_ENV || 'development';
//
// var express = require('express');
// var config = require('./config/environment');
// // Setup server
// var app = express();
// var server = require('http').createServer(app);
// require('./config/express')(app);
// require('./routes')(app);
//
// //! Initialise logger
// var logger = require('./logger.js');
//
// // Start server
// server.listen(config.port, config.ip, function () {
// logger.log('debug','Express server listening on %d, in %s mode', config.port, app.get('env'));
// });
//
//
// // Expose app
// exports = module.exports = app;
