var _ = require('lodash');
var xml2js = require('xml2js');

var fetch = require('./fetch');
var avalx = require('./avalx');

require('es6-promise');

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

        var caaml_json = new Promise(function(resolve, reject){
            xml_parser.parseString(data, function(err, result){
                if (err) {
                    return reject(err)
                } else {
                    return resolve(result)
                }
            });
        });
        return caaml_json
            .then(function(caaml_json){
                return avalx.parksForecast(caaml_json, region_id);
            });
    }
}


var AVCAN = {
    'northwest-coastal': {
        fetchNow: function() { return fetch.fetchAvalx2019(16).then(parseAvalx('northwest-coastal')); },
        metadata: reg_properties['northwest-coastal'],
    },
    'northwest-inland': {
        fetchNow: function(){ return fetch.fetchAvalx2019(17).then(parseAvalx('northwest-inland')); },
        metadata: reg_properties['northwest-inland'],
    },
    'sea-to-sky': {
        fetchNow: function(){ return fetch.fetchAvalx2019(14).then(parseAvalx('sea-to-sky')); },
        metadata: reg_properties['sea-to-sky'],
    },
    'south-coast-inland': {
        fetchNow: function(){ return fetch.fetchAvalx2019(15).then(parseAvalx('south-coast-inland')); },
        metadata: reg_properties['south-coast-inland'],
    },
    'south-coast': {
        fetchNow: function(){ return fetch.fetchAvalx2019(8).then(parseAvalx('south-coast')); },
        metadata: reg_properties['south-coast'],
    },
    'north-rockies': {
        fetchNow: function(){ return fetch.fetchAvalx2016(9).then(parseAvalx('north-rockies')); },
        metadata: reg_properties['north-rockies'],
    },
    'cariboos': {
        fetchNow: function () { return fetch.fetchAvalx2019(19).then(parseAvalx('cariboos')); },
        metadata: reg_properties['cariboos'],
    },
    'north-columbia': {
        fetchNow: function(){ return fetch.fetchAvalx2019(18).then(parseAvalx('north-columbia')); },
        metadata: reg_properties['north-columbia'],
    },
    'south-columbia': {
        fetchNow: function(){ return fetch.fetchAvalx2019(10).then(parseAvalx('south-columbia')); },
        metadata: reg_properties['south-columbia'],
    },
    'purcells': {
        fetchNow: function(){ return fetch.fetchAvalx2019(11).then(parseAvalx('purcells')); },
        metadata: reg_properties['purcells'],
    },
    'kootenay-boundary': {
        fetchNow: function(){ return fetch.fetchAvalx2019(6).then(parseAvalx('kootenay-boundary')); },
        metadata: reg_properties['kootenay-boundary'],
    },
    'south-rockies': {
        fetchNow: function(){ return fetch.fetchAvalx2019(13).then(parseAvalx('south-rockies')); },
        metadata: reg_properties['south-rockies'],
    },
    'lizard-range': {
        fetchNow: function(){ return fetch.fetchAvalx2019(12).then(parseAvalx('lizard-range')); },
        metadata: reg_properties['lizard-range'],
    },
    'yukon': {
        fetchNow: function(){ return fetch.fetchAvalx2019(20).then(parseAvalx('yukon')); },
        metadata: reg_properties['yukon'],
    },
};


var KCOUNTRY =  {
    'kananaskis': {
        fetchNow: function(){ return fetch.fetchAvalx2016(7).then(parseAvalx('kananaskis')); },
        metadata: reg_properties['kananaskis'],
    },
};


// PARKS

var PARKS = {
    'glacier': {
        fetchNow: function(){ return fetch.fetchParks(3).then(parseAvalx('glacier')); },
        metadata: reg_properties['glacier'],
    },
    'little-yoho': {
        fetchNow: function(){ return fetch.fetchParks(5).then(parseAvalx('little-yoho')); },
        metadata: reg_properties['little-yoho'],
    },
    'banff-yoho-kootenay': {
        fetchNow: function(){ return fetch.fetchParks(1).then(parseAvalx('banff-yoho-kootenay')); },
        metadata: reg_properties['banff-yoho-kootenay'],
    },
    'jasper': {
        fetchNow: function(){ return fetch.fetchParks(2).then(parseAvalx('jasper')); },
        metadata: reg_properties['jasper'],
    },
    'waterton': {
        fetchNow: function(){ return fetch.fetchParks(4).then(parseAvalx('waterton')); },
        metadata: reg_properties['waterton'],
    },
};

var LINKS = {
    'vancouver-island' : { metadata: reg_properties['vancouver-island'] },
    'chic-chocs'       : { metadata: reg_properties['chic-chocs'] },
    'north-rockies'    : { metadata: reg_properties['north-rockies'] },
};


module.exports = {
    cached_regions: Object.assign({}, AVCAN, PARKS),
}
