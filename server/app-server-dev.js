// TODO: Add all routes from ./routes.js
// TODO: Add the express config
// See code below

const path = require('path');
const express = require('express');
const logger = require('./logger');

const port = process.env.PORT || 9000;
const app = express();

const isDeveloping = process.env.NODE_ENV !== 'production';

require('./config/express')(app);
require('./routes')(app);

app.use('/public', express.static(path.resolve(__dirname, '../dist/public'), {fallthrough:false}));

app.use('/api/*', function(req, resp){ return resp.status(404).send('Not Found'); });

app.get('*', function response(req, res) {
    res.sendFile(path.resolve(__dirname, '../dist/public/index.html'));
});

app.on('error', function(err){
    logger.error('FATAL', {app:'ac-web', error: err});
});

app.listen(port, '0.0.0.0', function onStart(err) {
    if (err) {
        logger.error('listen:', err);
    }
    logger.info("STARTING", {app:'ac-web'});
    logger.info('listening on port:', port);
});

