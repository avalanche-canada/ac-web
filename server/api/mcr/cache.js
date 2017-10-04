'use strict';
var cacheManager = require('cache-manager');
var redisStore   = require('cache-manager-redis');

var logger = require('../../logger');

var mcr_cache = null;

if (process.env.REDIS_HOST) {
    logger.info('MCR::cache - using Redis cache ');
    mcr_cache = cacheManager.caching({
        store: redisStore,
        host: process.env.REDIS_HOST, // default value
        port: 6379, // default value
        db: 5,
        ttl: 60 * 5 /*seconds*/,
    });
} else {
    logger.info('MCR::cache - using memory cache ');
    mcr_cache = cacheManager.caching({
        store: 'memory',
        max: 100,
        ttl: 60 * 10 /*seconds*/,
    });
}

module.exports = mcr_cache;
