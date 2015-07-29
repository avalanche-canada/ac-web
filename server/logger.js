var winston = require('winston');
var papertrail = require('winston-papertrail').Papertrail;

var logger,
    consoleLogger = new winston.transports.Console({
        level: 'debug',
        timestamp: function() {
            return new Date().toString();
        },
        colorize: true
    }),
    ptTransport = new papertrail({
        host: 'logs2.papertrailapp.com',
        port: 49854,
        hostname: 'web-01',
        level: 'debug',
        logFormat: function(level, message) {
            return '[' + level + '] ' + message;
        }
    });

ptTransport.on('error', function(err) {
    if(logger){
        logger.error(err);
    }
});

ptTransport.on('connect', function(message) {
    if(logger){
        logger.info(message);
    }
});

var logger = new winston.Logger({
    levels: {
        debug: 0,
        info: 1,
        warn: 2,
        error: 3
    },
    transports: [
        ptTransport,
        consoleLogger
    ]
});

module.exports= logger;
