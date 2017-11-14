// TODO: Add all routes from ./routes.js
// TODO: Add the express config
// See code below

const path = require('path');
const express = require('express');
const port = process.env.PORT || 9000;
const app = express();

const isDeveloping = process.env.NODE_ENV !== 'production';

require('./config/express')(app);
require('./routes')(app);

console.log(__dirname);

const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
// const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require(path.resolve(__dirname, '../webpack.dev.js'));
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

// app.use(webpackHotMiddleware(compiler));
app.use(middleware);

app.get('*', function response(req, res) {
    const filename = path.resolve(__dirname, '../dist/public/index.html');

    res.write(middleware.fileSystem.readFileSync(filename));
    res.end();
});

app.listen(port, '0.0.0.0', function onStart(err) {
    if (err) {
        console.log(err);
    }
    console.info(
        '==> Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.',
        port,
        port
    );
});
