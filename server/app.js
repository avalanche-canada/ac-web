// TODO: Add all routes from ./routes.js
// TODO: Add the express config
// See code below

const express = require('express');
const path = require('path');
const logger = require('./logger');
const config = require('./config/environment');

const app = express();

require('./config/express')(app);
require('./routes')(app);

app.use('/public', express.static(path.resolve(__dirname, '../public'), {fallthrough: false}));

app.use('/api/*', function(req, resp){ return resp.status(404).send('Not Found'); });

app.get('*', function response(req, res) {
    res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

app.listen(config.PORT, '0.0.0.0', function onStart(err) {
    if (err) {
        logger.error('listen', err);
    }
    logger.info("STARTING_APP");
    logger.info('listening on port:', config.PORT);
});
