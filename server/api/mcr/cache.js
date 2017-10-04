'use strict';
var cacheManager = require('cache-manager');
var redisStore   = require('cache-manager-redis');

var logger = require('../../logger');

var mcr_cache = null;


// Used for list pages (to check for new posts)
var TTL_LIST = 60 * 5; // Seconds

// Used for Items (Single Reports and Users)
//  These are updated way slower
var TTL_ITEMS = 60 * 60; // Seconds

if (process.env.REDIS_HOST) {
    logger.info('MCR::cache - using Redis cache ');
    mcr_cache = cacheManager.caching({
        store: redisStore,
        host: process.env.REDIS_HOST, // default value
        port: 6379, // default value
        db: 5,
        ttl: TTL_LIST
    });
} else {
    logger.info('MCR::cache - using memory cache ');
    mcr_cache = cacheManager.caching({
        store: 'memory',
        max: 100,
        ttl: TTL_LIST
    });
}

module.exports = {
    cache: mcr_cache,
    TTL_LIST: TTL_LIST,
    TTL_ITEMS: TTL_ITEMS,
};
