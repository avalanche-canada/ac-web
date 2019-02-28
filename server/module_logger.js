
var base_logger = require('./logger');

function Logger(extra_data, logger) {
    this.data = extra_data || {};
    this.logger = logger || base_logger;
}

Logger.prototype.extend = function extend(extra_data) {
    return new Logger(extra_data, this);
}

Logger.prototype.debug = function debug(msg, metadata){ this.logger.debug(msg, Object.assign({}, this.data, metadata)); };
Logger.prototype.error = function error(msg, metadata){ this.logger.error(msg, Object.assign({}, this.data, metadata)); };
Logger.prototype.info  = function  info(msg, metadata){ this.logger.info(msg,  Object.assign({}, this.data, metadata)); };
Logger.prototype.trace = function trace(msg, metadata){ this.logger.trace(msg, Object.assign({}, this.data, metadata)); };
Logger.prototype.warn  = function  warn(msg, metadata){ this.logger.warn(msg,  Object.assign({}, this.data, metadata)); };


module.exports = new Logger();

