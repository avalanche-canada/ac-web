var winston = require('winston');
var Papertrail = require('winston-papertrail').Papertrail;
var os = require('os');

var ptHostname = process.env.LOG_PREFIX + '-' + os.hostname();

console.log('Logging to papertrail with hostname:', ptHostname);

var logger,
    consoleLogger = new winston.transports.Console({
        level: 'debug',
        timestamp: function() {
            return new Date().toString();
        },
        colorize: true
    }),
    ptTransport = new Papertrail({
        host: 'logs2.papertrailapp.com',
        port: 49854,
        hostname: ptHostname,
        level: 'debug',
        logFormat: function(level, message) {
            return '[' + level + '] ' + message;
        }
    });

ptTransport.on('error', function(err) {
    console.log('ERROR Logging to papertrail: ' + err);
});

ptTransport.on('connect', function(message) {
    console.log('Papertrail Connected: ' + message)
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
