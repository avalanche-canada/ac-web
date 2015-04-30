var logger = require('winston');
require('winston-papertrail').Papertrail;

//! add papertrail in production dev and qa
//if (process.env.NODE_ENV !== 'local' ) {
console.log('logging to Papertrail enabled');
logger.add(logger.transports.Papertrail, {
        host: 'logs2.papertrailapp.com',
        port: 49854
    });
//}

module.exports=logger;
