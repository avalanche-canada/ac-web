var Q = require('q');
var rp = require('request-promise');
var _ = require('lodash');
var events = require('events');

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
    this.urls = [];
    this.options = options || {};
    this.cache = this.options.store || new WebCacheMem();
    this.isReady = false;
    events.EventEmitter.call(this);

    if(_.isNumber(this.options.refreshInterval)) {
        var self = this;

        setInterval(function () {
            if(self.urls.length > 0) self.refresh();
        }, self.options.refreshInterval);
    }
};

WebCache.prototype.__proto__ = events.EventEmitter.prototype;

WebCache.prototype.seed = function (seedUrls) {
    this.urls = seedUrls;
    this.refresh();
};

WebCache.prototype.refresh = function () {
    var self = this;
    var start = +new Date;
    var requests = this.urls.map(function (url) { 
        var options = {
            uri: url,
            headers: {
                'cache-control': 'no-cache'
            },
            transform: function (body, response) {
                console.log(url);
                return {
                    url: url,
                    data: body
                }
            },
            timeout: 300000
        };

        console.log('cache getting: %s', url);
        return rp(options).catch(function (e) { console.log(e); });
    });

    console.log('cache started and seeding %s items.', requests.length);

    return Q.allSettled(requests).then(function (results) {
        results = _.groupBy(results, 'state');
        results.rejected = results.rejected || [];

        var sets = results.fulfilled.map(function (r) { return self.cache.set(r.value.url, r.value.data); })

        return Q.allSettled(sets).then(function () {
            var end = +new Date;
            var duration = (end-start);

            if(!self.isready) {
                console.log('cache seeded with %s successes and %s timeouts in %s milliseconds', results.fulfilled.length, results.rejected.length, duration);
                self.isready = true;
                self.emit('seeded');
            } else {
                console.log('cache refreshed with %s successes and %s timeouts in %s milliseconds', results.fulfilled.length, results.rejected.length, duration);
                self.emit('refreshed');
            }
        });
    }, function (e) { console.log('error:' + e); });
};

WebCache.prototype.get = function (url) {
    return this.cache.get(url);
};

WebCache.prototype.cacheUrl = function (url, data) {
    if(this.urls.indexOf(url) === -1) this.urls.push(url);
    if(data) this.cache.set(url, data);
};

module.exports = WebCache;