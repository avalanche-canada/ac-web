var Q = require('q');
var rp = require('request-promise');
var _ = require('lodash');
var events = require('events');
var logger = require('../../logger');

/**
 * Web cache is now seeded by "items" (instead of the previous "urls")
 * type item = {
 *    key: string,
 *    fetch: () => Promise[json]
 * }
 */

var WebCacheMem = function () {
    this.client = {};
};

WebCacheMem.prototype.get = function (key) {
    var jval = this.client[key];
    logger.debug("OTHER", key, jval)
    var val = JSON.parse(jval);
    return Q.fcall(function () { return val; });
};

WebCacheMem.prototype.set = function (key, val) {
    var jval = JSON.stringify(val)
    this.client[key] = jval;
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

        self.timer = setInterval(function () {
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
    logger.debug('webcache refresh')
    var self = this;
    var start = +new Date;
    // Kick off all the Promises to get items
    //TODO: batch these or do them sequentially to not overload the server
    var requests = _.map(this.items, function(item){
        var p = item.fetch()
            .then(function(result){
                logger.debug('fetch success key=%s', item.key);
                return {key: item.key, result: result};
            })
            .catch(function(err){
                logger.debug('fetch failure key=%s', item.key);
                return Promise.reject({key: item.key, err: err});
            });
        return p;
    });

    logger.info('webcache started seeding item_count=%d', requests.length);

    return Q.allSettled(requests).then(function (results) {
        results = _.groupBy(results, 'state');
        results.rejected  = results.rejected  || [];
        results.fulfilled = results.fulfilled || [];

        logger.info('webcache fetchComplete fulfilled=%d rejected=%d',
            results.fulfilled.length, results.rejected.length);
        var sets = results.fulfilled.map(function (r) {
            return self.cache.set(r.value.key, r.value.result);
        });

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
    }).done();
};

WebCache.prototype.get = function (url) {
    return this.cache.get(url);
};

//WebCache.prototype.cacheUrl = function (url, data) {
//    if(this.urls.indexOf(url) === -1) this.urls.push(url);
//    if(data) this.cache.set(url, data);
//};

module.exports = WebCache;
