var _        = require('lodash');
var xml2js   = require('xml2js');
var Q        = require('q');
var fetch    = require('./fetch');
var avalx    = require('./avalx');
var avid    = require('./avid');
var icon_set = require('./icon_set');
var addDays  = require('date-fns/add_days');

var reg_metadata = require('../../data/season');
var avid_mappings = require('./avid_mappings');

var regs_by_id = _.keyBy(reg_metadata.forecast_regions.features, function(r) {
    return r.id
})
var reg_properties = _.mapValues(regs_by_id, function(r) {
    return r.properties
})

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
function addOwner(owner)    { return function(fx) { return Object.assign({}, fx, {owner: owner}); } }
// TODO Need to review the need for that function, perhaps we do not need anymore. 
function fixAvalxDangerRatingDates(offset) {
    return function(fx) {
        return Object.assign({}, fx, {
            dangerRatings: fx.dangerRatings.map(function(dangerRating, index) {
                return Object.assign({}, dangerRating, {
                    date: addDays(fx.dateIssued, index + offset),
                })
            })
        });
    }
}

var AVCAN = {
    'northwest-coastal': {
        metadata: reg_properties['northwest-coastal'],
        fetchNow: function() {
            return fetch
                .fetchAvid()
                .then(fetch.filterAvidByLocation(avid_mappings.byName['northwest-coastal']))
                .then(avid.parseAvid('northwest-coastal', 'Northwest Coastal'))
                .then(addOwner('avalanche-canada'))
                .then(addStaticIcons('America/Vancouver'))
            // return fetch.fetchAvalx2019(16)
            //     .then(parseAvalx('northwest-coastal'))
            //     .then(fixAvalxDangerRatingDates(1))
            //     .then(addOwner('avalanche-canada'))
            //     .then(addStaticIcons('America/Vancouver'));
        },
    },
    'northwest-inland': {
        metadata: reg_properties['northwest-inland'],
        fetchNow: function(){
            return fetch
                .fetchAvid()
                .then(fetch.filterAvidByLocation(avid_mappings.byName['northwest-inland']))
                .then(avid.parseAvid('northwest-inland', 'Northwest Inland'))
                .then(addOwner('avalanche-canada'))
                .then(addStaticIcons('America/Vancouver'))
            // return fetch.fetchAvalx2019(17)
            //     .then(parseAvalx('northwest-inland'))
            //     .then(fixAvalxDangerRatingDates(1))
            //     .then(addOwner('avalanche-canada'))
            //     .then(addStaticIcons('America/Vancouver'));
        },
    },
    'sea-to-sky': {
        metadata: reg_properties['sea-to-sky'],
        fetchNow: function(){ 
            return fetch
                .fetchAvid()
                .then(fetch.filterAvidByLocation(avid_mappings.byName['sea-to-sky']))
                .then(avid.parseAvid('sea-to-sky', 'Sea to Sky'))
                .then(addOwner('avalanche-canada'))
                .then(addStaticIcons('America/Vancouver'))
            // return fetch.fetchAvalx2019(14)
            //     .then(parseAvalx('sea-to-sky'))
            //     .then(fixAvalxDangerRatingDates(1))
            //     .then(addOwner('avalanche-canada'))
            //     .then(addStaticIcons('America/Vancouver'));
        },
    },
    'south-coast-inland': {
        metadata: reg_properties['south-coast-inland'],
        fetchNow: function(){
            return fetch
                .fetchAvid()
                .then(fetch.filterAvidByLocation(avid_mappings.byName['south-coast-inland']))
                .then(avid.parseAvid('south-coast-inland', 'South Coast Inland'))
                .then(addOwner('avalanche-canada'))
                .then(addStaticIcons('America/Vancouver'))
            // return fetch.fetchAvalx2019(15)
            //     .then(parseAvalx('south-coast-inland'))
            //     .then(fixAvalxDangerRatingDates(1))
            //     .then(addOwner('avalanche-canada'))
            //     .then(addStaticIcons('America/Vancouver'));
        },
    },
    'south-coast': {
        metadata: reg_properties['south-coast'],
        fetchNow: function(){
            return fetch
                .fetchAvid()
                .then(fetch.filterAvidByLocation(avid_mappings.byName['south-coast']))
                .then(avid.parseAvid('south-coast', 'South Coast'))
                .then(addOwner('avalanche-canada'))
                .then(addStaticIcons('America/Vancouver'))
            // return fetch.fetchAvalx2019(8)
            //     .then(parseAvalx('south-coast'))
            //     .then(fixAvalxDangerRatingDates(1))
            //     .then(addOwner('avalanche-canada'))
            //     .then(addStaticIcons('America/Vancouver'));
        },
    },
    'north-rockies': {
        metadata: reg_properties['north-rockies'],
        fetchNow: function(){
            return fetch
                .fetchAvid()
                .then(fetch.filterAvidByLocation(avid_mappings.byName['north-rockies']))
                .then(avid.parseAvid('north-rockies', 'North Rockies'))
                .then(addOwner('avalanche-canada'))
                .then(addMovingIcons('America/Vancouver'))
            // return fetch.fetchAvalx2019(9)
            //     .then(parseAvalx('north-rockies'))
            //     .then(fixAvalxDangerRatingDates(1))
            //     .then(addOwner('avalanche-canada'))
            //     .then(addMovingIcons('America/Vancouver'));
        },
    },
    'cariboos': {
        metadata: reg_properties['cariboos'],
        fetchNow: function() {
            return fetch
                .fetchAvid()
                .then(fetch.filterAvidByLocation(avid_mappings.byName['cariboos']))
                .then(avid.parseAvid('cariboos', 'Cariboos'))
                .then(addOwner('avalanche-canada'))
                .then(addStaticIcons('America/Vancouver'))
            // return fetch.fetchAvalx2019(19)
            //     .then(parseAvalx('cariboos'))
            //     .then(fixAvalxDangerRatingDates(1))
            //     .then(addOwner('avalanche-canada'))
            //     .then(addStaticIcons('America/Vancouver'));
        },
    },
    'north-columbia': {
        metadata: reg_properties['north-columbia'],
        fetchNow: function(){
            return fetch
                .fetchAvid()
                .then(fetch.filterAvidByLocation(avid_mappings.byName['north-columbia']))
                .then(avid.parseAvid('north-columbia', 'North Columbia'))
                .then(addOwner('avalanche-canada'))
                .then(addStaticIcons('America/Vancouver'))
            // return fetch.fetchAvalx2019(18)
            //     .then(parseAvalx('north-columbia'))
            //     .then(fixAvalxDangerRatingDates(1))
            //     .then(addOwner('avalanche-canada'))
            //     .then(addStaticIcons('America/Vancouver'));
        },
    },
    'south-columbia': {
        metadata: reg_properties['south-columbia'],
        fetchNow: function(){ 
            return fetch
                .fetchAvid()
                .then(fetch.filterAvidByLocation(avid_mappings.byName['south-columbia']))
                .then(avid.parseAvid('south-columbia', 'South Columbia'))
                .then(addOwner('avalanche-canada'))
                .then(addStaticIcons('America/Vancouver'))
            // return fetch.fetchAvalx2019(10)
            //     .then(parseAvalx('south-columbia'))
            //     .then(fixAvalxDangerRatingDates(1))
            //     .then(addOwner('avalanche-canada'))
            //     .then(addStaticIcons('America/Vancouver'));
        },
    },
    'purcells': {
        metadata: reg_properties['purcells'],
        fetchNow: function(){ 
            return fetch
                .fetchAvid()
                .then(fetch.filterAvidByLocation(avid_mappings.byName['purcells']))
                .then(avid.parseAvid('purcells', 'Purcells'))
                .then(addOwner('avalanche-canada'))
                .then(addStaticIcons('America/Vancouver'))
            // return fetch.fetchAvalx2019(11)
            //     .then(parseAvalx('purcells'))
            //     .then(fixAvalxDangerRatingDates(1))
            //     .then(addOwner('avalanche-canada'))
            //     .then(addStaticIcons('America/Vancouver'));
        },
    },
    'kootenay-boundary': {
        metadata: reg_properties['kootenay-boundary'],
        fetchNow: function(){
            return fetch
                .fetchAvid()
                .then(fetch.filterAvidByLocation(avid_mappings.byName['kootenay-boundary']))
                .then(avid.parseAvid('kootenay-boundary', 'Kootenay-Boundary'))
                .then(addOwner('avalanche-canada'))
                .then(addStaticIcons('America/Vancouver'))
            // return fetch.fetchAvalx2019(6)
            //     .then(parseAvalx('kootenay-boundary'))
            //     .then(fixAvalxDangerRatingDates(1))
            //     .then(addOwner('avalanche-canada'))
            //     .then(addStaticIcons('America/Vancouver'));
        },
    },
    'south-rockies': {
        metadata: reg_properties['south-rockies'],
        fetchNow: function(){
            return fetch
                .fetchAvid()
                .then(fetch.filterAvidByLocation(avid_mappings.byName['south-rockies']))
                .then(avid.parseAvid('south-rockies', 'South Rockies'))
                .then(addOwner('avalanche-canada'))
                .then(addStaticIcons('America/Vancouver'))
            // return fetch.fetchAvalx2019(13)
            //     .then(parseAvalx('south-rockies'))
            //     .then(fixAvalxDangerRatingDates(1))
            //     .then(addOwner('avalanche-canada'))
            //     .then(addStaticIcons('America/Vancouver'));
        },
    },
    'lizard-range': {
        metadata: reg_properties['lizard-range'],
        fetchNow: function(){
            return fetch
                .fetchAvid()
                .then(fetch.filterAvidByLocation(avid_mappings.byName['lizard-range']))
                .then(avid.parseAvid('lizard-range', 'Lizard-Flathead'))
                .then(addOwner('avalanche-canada'))
                .then(addStaticIcons('America/Vancouver'))
            // return fetch.fetchAvalx2019(12)
            //     .then(parseAvalx('lizard-range'))
            //     .then(fixAvalxDangerRatingDates(1))
            //     .then(addOwner('avalanche-canada'))
            //     .then(addStaticIcons('America/Vancouver'));
        },
    },
    'yukon': {
        metadata: reg_properties['yukon'],
        fetchNow: function(){
            return fetch
                .fetchAvid()
                .then(fetch.filterAvidByLocation(avid_mappings.byName['yukon']))
                .then(avid.parseAvid('yukon', 'Yukon'))
                .then(addOwner('avalanche-canada'))
                .then(addMovingIcons('America/Vancouver'))
            // return fetch.fetchAvalx2019(20)
            //     .then(parseAvalx('yukon'))
            //     .then(fixAvalxDangerRatingDates(1))
            //     .then(addOwner('avalanche-canada'))
            //     .then(addMovingIcons('America/Vancouver'));
        },
    },
};


var KCOUNTRY =  {
    'kananaskis': {
        metadata: reg_properties['kananaskis'],
        fetchNow: function(){
            return fetch
                .fetchAvid()
                .then(fetch.filterAvidByLocation(avid_mappings.byName['kananaskis']))
                .then(avid.parseAvid('kananaskis', 'Kananaskis Country'))
                .then(addOwner('avalanche-canada'))
                .then(addStaticIcons('America/Vancouver'))
            // return fetch.fetchAvalx2016(7)
            //     .then(parseAvalx('kananaskis'))
            //     .then(fixAvalxDangerRatingDates(1))
            //     .then(addOwner('avalanche-canada'))
            //     .then(addStaticIcons('America/Edmonton'));
        },
    },
};


// PARKS

var PARKS = {
    'glacier': {
        metadata: reg_properties['glacier'],
        fetchNow: function(){
            return fetch.fetchParks(3)
                .then(parseAvalx('glacier'))
                .then(fixAvalxDangerRatingDates(0))
                .then(addOwner('parks-canada'))
                .then(addStaticIcons('America/Vancouver'));
        },
    },
    'little-yoho': {
        metadata: reg_properties['little-yoho'],
        fetchNow: function(){
            return fetch.fetchParks(5)
                .then(parseAvalx('little-yoho'))
                .then(fixAvalxDangerRatingDates(1))
                .then(addOwner('parks-canada'))
                .then(addStaticIcons('America/Edmonton'));
        },
    },
    'banff-yoho-kootenay': {
        metadata: reg_properties['banff-yoho-kootenay'],
        fetchNow: function(){
            return fetch.fetchParks(1)
                .then(parseAvalx('banff-yoho-kootenay'))
                .then(fixAvalxDangerRatingDates(1))
                .then(addOwner('parks-canada'))
                .then(addStaticIcons('America/Edmonton'));
        },
    },
    'jasper': {
        metadata: reg_properties['jasper'],
        fetchNow: function(){
            return fetch.fetchParks(2)
                .then(parseAvalx('jasper'))
                .then(fixAvalxDangerRatingDates(1))
                .then(addOwner('parks-canada'))
                .then(addStaticIcons('America/Edmonton'));
        },
    },
    'waterton': {
        metadata: reg_properties['waterton'],
        fetchNow: function(){
            return fetch.fetchParks(4)
                .then(parseAvalx('waterton'))
                .then(addOwner('parks-canada'))
                .then(addMovingIcons('America/Edmonton'))
                .then(fixAvalxDangerRatingDates(1));
        },
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
