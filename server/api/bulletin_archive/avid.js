var moment  = require('moment');
var request = require('request');
var _       = require('lodash');

var logger        = require('../../logger');
var avid          = require('../forecasts/avid');
var fetch         = require('../forecasts/fetch');
var avid_mappings = require('../forecasts/avid_mappings');

var region_meta   = require('../../data/season').forecast_regions;
region_meta = _.groupBy(region_meta.features, 'id');
regionNamesHuman = _.mapValues(region_meta, function(m) { return m[0]['properties']['name']; });


var regionNames = Object.keys(avid_mappings.byName);

function getAvid(regionId, date, callback) {
    // Validate :region is something we know about
    // TODO(wnh): Maybe not since its all old stuff and regions are in flux?
    if (regionNames.indexOf(regionId) === -1) {
        return callback(null, null);
    }

    // Parse time and validete it is full ISO_8601 date-time with timezone info
    // TODO(wnh): force the TIMEZONE on tis date
    var date = moment(date, moment.ISO_8601);
    if (!date.isValid()) {
        return callback(null, null);
    }

    var areaId = avid_mappings.byName[regionId];
    var avidUrl = "https://avid-api.avalanche.ca/v1/public/en/products?date="+date.toISOString();
    if (regionId === "kananaskis") {
        if (date.isBefore('2020-11-13T07:00:00.000Z')){
            areaId = "69c3043f-ab2d-4508-b144-78ac4f745159" //old k-country
        }else{
            avidUrl = "https://avid-kananaskis-api.avalanche.ca/v1/public/en/products?date="+date.toISOString();
        }
    }

    return fetchAvidText(date, avidUrl, function(err, data) {
        if (err) {
            logger.warn("bulletin_archive getAvid error="+err);
            e = new Error("Error fetching from archive backend");
            return callback(e, null);
        }

        var filterFn = fetch.filterAvidByLocation(areaId);
        var avidfx   = filterFn(data);
        var avidJson = avid.parseAvid(regionId, regionNamesHuman[regionId])(avidfx);

        //TODO(wnh): Stolen from server/api/forecasts/region_config.js:addOwner
        //           Do some refactoring to make de duplicate this
        avidJson =  Object.assign({}, avidJson, {owner: 'avalanche-canada'});

        callback(null, avidJson);
    });
}

function fetchAvidText(date, url, callback) {
    logger.debug('archive_fetch url='+url);
    var options = {
        uri: url,
        headers: { 'cache-control': 'no-cache', },
        timeout: 300000,
    };

    request(options, function(error, response, data){
        if (error){
            logger.error('archive_fetch error='+error);
            callback(error, null);
        } else if (response.statusCode != 200) {
            var e = new Error('avid_fetch request_error url=' + url+ ' responseCode=' + response.statusCode);
            logger.warn('archive_fetch non_200_status code='+response.statusCode + ' url='+url);
            callback(e, null);
        } else {
            callback(null, data);
        }
    });
}

module.exports = {getAvid: getAvid};

