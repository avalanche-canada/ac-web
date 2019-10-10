var Q = require('q');
var rp = require('request-promise');
var _ = require('lodash');
var events = require('events');
var logger = require('../../logger');

/**
 * Web cache is now seeded by "items" (instead of the previous "urls")
 * type item = {
 *    key: string,
 *    fetch: () => json
 * }
 */

var WebCacheMem = function () {
    this.client = {};
};

WebCacheMem.prototype.get = function (key) {
    var val = this.client[key];
    return Q.fcall(function () { return val; });
};

WebCacheMem.prototype.set = function (key, val) {
    this.client[key] = val;
    return Q.fcall(function () { return 'OK'; });
};

var WebCache = function (options) {
    this.items = [];
    this.options = options || {};
    this.cache = this.options.store || new WebCacheMem();
    this.isReady = false;
    events.EventEmitter.call(this);

    if(_.isNumber(this.options.refreshInterval)) {
        var self = this;

        setInterval(function () {
            if(self.items.length > 0) self.refresh();
        }, self.options.refreshInterval);
    }
};

WebCache.prototype.__proto__ = events.EventEmitter.prototype;

WebCache.prototype.seed = function (seed_items) {
    logger.info('webcache seed items=%s', JSON.stringify(_.map(seed_items, function(x){return x.key})));
    this.items = seed_items;
    this.refresh();
};

WebCache.prototype.refresh = function () {
    var self = this;
    var start = +new Date;
    // Kick off all the Promises to get items
    //TODO: batch these or do them sequentially to not overload the server
    var requests = _.map(this.items, function(item){ 
        var p = item.fetch()
            .then(function(result){
                return {key: item.key, result: result};
            }); 
        return p;
    });

    logger.info('webcache started seeding item_count=%d', requests.length);

    return Q.allSettled(requests).then(function (results) {
        results = _.groupBy(results, 'state');
        results.rejected = results.rejected || [];

        var sets = results.fulfilled.map(function (r) { 
            return self.cache.set(r.value.key, r.value.result); 
        })

        return Q.allSettled(sets).then(function () {
            var end = +new Date;
            var duration = (end-start);

            if(!self.isready) {
                logger.info('webcache seeded success_count=%d timeout_count=%d time_ms=%s', results.fulfilled.length, results.rejected.length, duration);
                self.isready = true;
                self.emit('seeded');
            } else {
                logger.info('webcache seeded success_count=%d timeout_count=%d time_ms=%s', results.fulfilled.length, results.rejected.length, duration);
                self.emit('refreshed');
            }
        });
    }, function (e) { logger.error('webcache requests', e); });
};

WebCache.prototype.get = function (url) {
    return this.cache.get(url);
};

//WebCache.prototype.cacheUrl = function (url, data) {
//    if(this.urls.indexOf(url) === -1) this.urls.push(url);
//    if(data) this.cache.set(url, data);
//};

module.exports = WebCache;
