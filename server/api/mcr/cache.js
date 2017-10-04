'use strict';
var cacheManager = require('cache-manager');
var redisStore   = require('cache-manager-redis');

var mcr_cache = null;

if (process.env.REDIS_HOST) {
    mcr_cache = cacheManager.caching({
        store: redisStore,
        host: process.env.REDIS_HOST, // default value
        port: 6379, // default value
        db: 5,
        ttl: 60 * 5 /*seconds*/,
    });
} else {
    mcr_cache = cacheManager.caching({
        store: 'memory',
        max: 100,
        ttl: 60 * 10 /*seconds*/,
    });
}

module.exports = mcr_cache;
