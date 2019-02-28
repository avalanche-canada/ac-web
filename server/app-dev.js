// TODO: Add all routes from ./routes.js
// TODO: Add the express config
// See code below

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const logger = require('./logger');

const port = process.env.PORT || 9000;
const app = express();

const isDeveloping = process.env.NODE_ENV !== 'production';

require('./config/express')(app);
require('./routes')(app);

const config = require(path.resolve(__dirname, '../webpack.development.config.js'));
const compiler = webpack(config);
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
    },
});

app.use(middleware);

app.get('*', function response(req, res, next) {
    middleware.waitUntilValid(function() {
        const filename = path.join(compiler.outputPath,'index.html')
        res.write(middleware.fileSystem.readFileSync(filename));
        return res.end();
    });
});

app.listen(port, '0.0.0.0', function onStart(err) {
    if (err) {
        logger.error('listen:', err);
    }
    logger.info("STARTING_APP");
    logger.info('listening on port:', port);
});
