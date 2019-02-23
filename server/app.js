// TODO: Add all routes from ./routes.js
// TODO: Add the express config
// See code below

const express = require('express');
const path = require('path');
const logger = require('./logger');

const port = process.env.PORT || 9000;
const app = express();

const isDeveloping = process.env.NODE_ENV !== 'production';

require('./config/express')(app);
require('./routes')(app);

app.use(express.static(path.resolve(__dirname, '../public')));

app.get('*', function response(req, res) {
    res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

app.listen(port, '0.0.0.0', function onStart(err) {
    if (err) {
        logger.error('listen', err);
    }
    logger.info("STARTING_APP");
    logger.info('listening on port:', port);
});
