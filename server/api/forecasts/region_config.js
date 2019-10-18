var _ = require('lodash');
var xml2js = require('xml2js');
var Q = require('q');

var fetch    = require('./fetch');
var avalx    = require('./avalx');
var icon_set = require('./icon_set');

var reg_metadata = require('../../data/season')

var regs_by_id = _.keyBy(reg_metadata.forecast_regions.features, function(r) {
    return r.id
})
var reg_properties = _.mapValues(regs_by_id, function(r) {
    return r.properties
})
var xml_parser = new xml2js.Parser();

function noop() {}

function parseAvalx(region_id) {
    return function(data) {
        var caaml_json = Q.Promise(function(resolve, reject){
            xml2js.parseString(data, function(err, result){
                if (err) {
                    reject({err: err})
                } else {
                    resolve(result)
                }
            });
        });
        return caaml_json
            .then(function(caaml_json){
                return avalx.parksForecast(caaml_json, region_id);
            });
    }
}
function addStaticIcons(tz) { return function(fx) { return icon_set.addStaticIcons(tz, fx); } }
function addMovingIcons(tz) { return function(fx) { return icon_set.addMovingIcons(tz, fx); } }

function consoledir(val) { console.dir(val); return val; }

var AVCAN = {
    'northwest-coastal': {
        metadata: reg_properties['northwest-coastal'],
        fetchNow: function() { return fetch.fetchAvalx2019(16) .then(parseAvalx('northwest-coastal')) .then(addStaticIcons('America/Vancouver')); },
    },
    'northwest-inland': {
        metadata: reg_properties['northwest-inland'],
        fetchNow: function(){ return fetch.fetchAvalx2019(17).then(parseAvalx('northwest-inland')).then(addStaticIcons('America/Vancouver')); },
    },
    'sea-to-sky': {
        metadata: reg_properties['sea-to-sky'],
        fetchNow: function(){ return fetch.fetchAvalx2019(14).then(parseAvalx('sea-to-sky')).then(addStaticIcons('America/Vancouver')); },
    },
    'south-coast-inland': {
        metadata: reg_properties['south-coast-inland'],
        fetchNow: function(){ return fetch.fetchAvalx2019(15).then(parseAvalx('south-coast-inland')).then(addStaticIcons('America/Vancouver')); },
    },
    'south-coast': {
        metadata: reg_properties['south-coast'],
        fetchNow: function(){ return fetch.fetchAvalx2019(8).then(parseAvalx('south-coast')).then(addStaticIcons('America/Vancouver')); },
    },
    'north-rockies': {
        metadata: reg_properties['north-rockies'],
        fetchNow: function(){ return fetch.fetchAvalx2016(9).then(parseAvalx('north-rockies')).then(addMovingIcons('America/Vancouver')); },
    },
    'cariboos': {
        metadata: reg_properties['cariboos'],
        fetchNow: function () { return fetch.fetchAvalx2019(19).then(parseAvalx('cariboos')).then(addStaticIcons('America/Vancouver')); },
    },
    'north-columbia': {
        metadata: reg_properties['north-columbia'],
        fetchNow: function(){ return fetch.fetchAvalx2019(18).then(parseAvalx('north-columbia')).then(addStaticIcons('America/Vancouver')); },
    },
    'south-columbia': {
        metadata: reg_properties['south-columbia'],
        fetchNow: function(){ return fetch.fetchAvalx2019(10).then(parseAvalx('south-columbia')).then(addStaticIcons('America/Vancouver')); },
    },
    'purcells': {
        metadata: reg_properties['purcells'],
        fetchNow: function(){ return fetch.fetchAvalx2019(11).then(parseAvalx('purcells')).then(addStaticIcons('America/Vancouver')); },
    },
    'kootenay-boundary': {
        metadata: reg_properties['kootenay-boundary'],
        fetchNow: function(){ return fetch.fetchAvalx2019(6).then(parseAvalx('kootenay-boundary')).then(addStaticIcons('America/Vancouver')); },
    },
    'south-rockies': {
        metadata: reg_properties['south-rockies'],
        fetchNow: function(){ return fetch.fetchAvalx2019(13).then(parseAvalx('south-rockies')).then(addStaticIcons('America/Vancouver')); },
    },
    'lizard-range': {
        metadata: reg_properties['lizard-range'],
        fetchNow: function(){ return fetch.fetchAvalx2019(12).then(parseAvalx('lizard-range')).then(addStaticIcons('America/Vancouver')); },
    },
    'yukon': {
        metadata: reg_properties['yukon'],
        fetchNow: function(){ return fetch.fetchAvalx2019(20).then(parseAvalx('yukon')).then(addMovingIcons('America/Vancouver')); },
    },
};


var KCOUNTRY =  {
    'kananaskis': {
        fetchNow: function(){ return fetch.fetchAvalx2016(7).then(parseAvalx('kananaskis')).then(addStaticIcons('America/Edmonton')); },
        metadata: reg_properties['kananaskis'],
    },
};


// PARKS

var PARKS = {
    'glacier': {
        fetchNow: function(){ return fetch.fetchParks(3).then(parseAvalx('glacier')).then(addStaticIcons('America/Vancouver')); },
        metadata: reg_properties['glacier'],
    },
    'little-yoho': {
        fetchNow: function(){ return fetch.fetchParks(5).then(parseAvalx('little-yoho')).then(addStaticIcons('America/Edmonton')); },
        metadata: reg_properties['little-yoho'],
    },
    'banff-yoho-kootenay': {
        fetchNow: function(){ return fetch.fetchParks(1).then(parseAvalx('banff-yoho-kootenay')).then(addStaticIcons('America/Edmonton')); },
        metadata: reg_properties['banff-yoho-kootenay'],
    },
    'jasper': {
        fetchNow: function(){ return fetch.fetchParks(2).then(parseAvalx('jasper')).then(addStaticIcons('America/Edmonton')); },
        metadata: reg_properties['jasper'],
    },
    'waterton': {
        fetchNow: function(){ return fetch.fetchParks(4).then(parseAvalx('waterton')).then(addStaticIcons('America/Edmonton')); },
        metadata: reg_properties['waterton'],
    },
};

var LINKS = {
    'vancouver-island' : { metadata: reg_properties['vancouver-island'] },
    'chic-chocs'       : { metadata: reg_properties['chic-chocs'] },
    'north-rockies'    : { metadata: reg_properties['north-rockies'] },
};

var TEST_REGIONS = {
    http_500: {
        thing: {
            fetchNow: function(){
                    return fetch.doFetch('http://httpbin.org/status/500');
            }
        }
    },
    bad_host: {
        thing: {
            fetchNow: function(){
                    return fetch.doFetch('http://not-a-real-thing.avalanche.ca/');
            }
        }
    }
};


module.exports = {
    cached_regions: Object.assign({}, AVCAN, KCOUNTRY, PARKS),
}
