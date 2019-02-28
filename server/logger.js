var winston = require('winston');
var Papertrail = require('winston-papertrail').Papertrail;
var os = require('os');

var ptHostname = process.env.LOG_PREFIX + '-' + os.hostname();

console.log('Logging to papertrail with hostname:', ptHostname);

function logfmt_string(data){
  var line = '';

  for(var key in data) {
    var value = data[key];
    var is_null = false;
    if(value == null) {
      is_null = true;
      value = '';
    } else if(typeof(value) == 'object'){
        value = JSON.stringify(value);
    }
    else {
        value = value.toString();
        var needs_quoting  = value.indexOf(' ') > -1 || value.indexOf('=') > -1;
        var needs_escaping = value.indexOf('"') > -1 || value.indexOf("\\") > -1;
        if(needs_escaping) value = value.replace(/["\\]/g, '\\$&');
        if(needs_quoting) value = '"' + value + '"';
        if(value === '' && !is_null) value = '""';
    }
    line += key + '=' + value + ' ';
  }
  //trim traling space
  return line.substring(0,line.length-1);
}

function loggerFormat(options){
    return '[' + options.level + '] ' + options.message + ' ' +
        logfmt_string(options.meta);
}

var logger,
    consoleLogger = new winston.transports.Console({
        level: 'debug',
        timestamp: function() {
            return new Date().toISOString();
        },
        formatter: loggerFormat,
        colorize: true,
    });
    ptTransport = new Papertrail({
        host: 'logs2.papertrailapp.com',
        port: 49854,
        hostname: ptHostname,
        level: 'debug',
        //logFormat: function(level, message) {
        //    return '[' + level + '] ' + message;
        //},
        formatter: loggerFormat
    });

ptTransport.on('error', function(err) {
    console.log('ERROR Logging to papertrail: ' + err);
});

ptTransport.on('connect', function(message) {
    console.log('Papertrail Connected: ' + message);
});

var logger = new winston.Logger({
    levels: {
        debug: 0,
        info: 1,
        warn: 2,
        error: 3,
    },
    //transports: [ptTransport, consoleLogger],
    transports: [consoleLogger],
});


module.exports = logger;
