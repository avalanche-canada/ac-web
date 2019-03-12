var Q = require('q');
var redis = require('redis');

var WebCacheRedis = function (port, host, options) {
    host = host || '127.0.0.1'
    port = port || 6379;
    options = options || {};

    this.client = redis.createClient(port, host, options);
};

WebCacheRedis.prototype.get = function (key) {
    var get = Q.denodeify(this.client.get.bind(this.client));
    return get(key);
};

WebCacheRedis.prototype.set = function (key, val) {
    var set =  Q.denodeify(this.client.set.bind(this.client));
    return set(key, val);
};

module.exports = WebCacheRedis;