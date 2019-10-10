var _ = require('lodash');

var WebCache = require('../../lib/webcache');
var WebCacheRedis = require('../../lib/webcache-redis');

var config = require('../../config/environment');
var region_config = require('./region_config')

// XXX: es6-promiseRequired to polyfill the cache-manager package
// When upgrading to a new version of node this may not be required
// (currently required on nodejs v0.10.26)
require('es6-promise');

var cacheManager = require('cache-manager');
var redisStore = require('cache-manager-redis');

var avalxWebcache = null;
var fragmentCache = null;

if (config.REDIS_HOST) {
    var webcacheOptions = {
        store: new WebCacheRedis(6379, config.REDIS_HOST),
    };
    if (!process.env.NO_CACHE_REFRESH)
        webcacheOptions.refreshInterval = 300000 /*milliseconds*/;
    avalxWebcache = new WebCache(webcacheOptions);

    fragmentCache = cacheManager.caching({
        store: redisStore,
        host: config.REDIS_HOST, // default value
        port: 6379, // default value
        db: 1,
        ttl: 60 * 5 /*seconds*/,
    });
} else {
    avalxWebcache = new WebCache();
    fragmentCache = cacheManager.caching({
        store: 'memory',
        max: 100,
        ttl: 60 * 10 /*seconds*/,
    });
}




var region_items =  _.map(region_config.cached_regions, function(reg, id){
    return {key: id, fetch: reg.fetchNow};
});

avalxWebcache.seed(region_items);


module.exports = {
    avalxWebcache:avalxWebcache,
    fragmentCache:fragmentCache,
}

