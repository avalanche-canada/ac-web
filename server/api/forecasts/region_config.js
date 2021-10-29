var _        = require('lodash');
var xml2js   = require('xml2js');
var Q        = require('q');
var fetch    = require('./fetch');
var avalx    = require('./avalx');
var avid     = require('./avid');
var prismic  = require('./prismic');
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
    'northwest-coastal': get('northwest-coastal').avid('Northwest Coastal'),
    // .prismic()
    // .avalx(16)
    'northwest-inland': get('northwest-inland').avid('Northwest Inland'),
    // .prismic()
    // .avalx(17)
    'sea-to-sky': get('sea-to-sky').avid('Sea to Sky'),
    // .prismic()
    // .avalx(14)
    'south-coast-inland': get('south-coast-inland').avid('South Coast Inland'),
    // .prismic()
    // .avalx(15)
    'south-coast': get('south-coast').avid('South Coast'),
    // .prismic()
    // .avalx(8)
    'north-rockies': get('north-rockies').avid('North Rockies', addMovingIcons),
    // .prismic()
    // .avalx(9)
    'cariboos': get('cariboos').avid('Cariboos'),
    // .prismic()
    // .avalx(19)
    'north-columbia': get('north-columbia').avid('North Columbia'),
    // .prismic()
    // .avalx(18)
    'south-columbia': get('south-columbia').avid('South Columbia'),
    // .prismic()
    // .avalx(10)
    'purcells': get('purcells').avid('Purcells'),
    // .prismic()
    // .avalx(11)
    'kootenay-boundary': get('kootenay-boundary').avid('Kootenay-Boundary'),
    // .prismic()
    // .avalx(6)
    'south-rockies': get('south-rockies').avid('South Rockies'),
    // .prismic()
    // .avalx(13)
    'lizard-range': get('lizard-range').avid('Lizard-Flathead'),
    // .prismic()
    // .avalx(12)
    'yukon': get('yukon').avid('Yukon', addMovingIcons),
    // .prismic()
    // .avalx(20)
    'vancouver-island': get('vancouver-island').avid('Vancouver Island'),
};


var KCOUNTRY =  {
    'kananaskis': get('kananaskis', 'America/Edmonton').avidKananaskis('Kananaskis Country')
    // .prismic()
    // .avalx(20)
};

var AVQ =  {
    'chic-chocs': get('chic-chocs').avidAvalancheQuebec('Chic Chocs')
};


var PARKS = {
    'glacier': get('glacier', 'UTC').parks(3, 0, addMovingIcons),
    'little-yoho': get('little-yoho', 'America/Edmonton').parks(5),
    'banff-yoho-kootenay': get('banff-yoho-kootenay', 'America/Edmonton').parks(1),
    'jasper': get('jasper', 'America/Edmonton').parks(2),
    'waterton': get('waterton', 'America/Edmonton').parks(4, 1, addMovingIcons),
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

function get(region, timezone) {
    timezone = typeof timezone === 'string' ? timezone : 'America/Vancouver';
    function createConfig(fetchNow) {
        return {
            metadata: reg_properties[region],
            fetchNow: fetchNow
        }
    }
    
    return {
        prismic: function(createIconSet) {
            createIconSet = typeof createIconSet === 'function' ? createIconSet : addStaticIcons

            return createConfig(function() {
                return prismic.fetch(region)
                        .then(prismic.parse)
                        .then(addOwner('avalanche-canada'))
                        .then(createIconSet(timezone))
            })
        },
        avid: function(name, createIconSet) {
            createIconSet = typeof createIconSet === 'function' ? createIconSet : addStaticIcons

            return createConfig(function() {
                return fetch.fetchAvid()
                        .then(fetch.filterAvidByLocation(avid_mappings.byName[region]))
                        .then(avid.parseAvid(region, name))
                        .then(addOwner('avalanche-canada'))
                        .then(createIconSet(timezone))
            })
        },
        avidKananaskis: function(name, createIconSet) {
            createIconSet = typeof createIconSet === 'function' ? createIconSet : addStaticIcons

            return createConfig(function() {
                return fetch.fetchAvidKananaskis()
                        .then(fetch.filterAvidByLocation(avid_mappings.byName[region]))
                        .then(avid.parseAvid(region, name))
                        .then(addOwner('avalanche-canada'))
                        .then(createIconSet(timezone))
            })
        },
        avidAvalancheQuebec: function(name, createIconSet) {
            createIconSet = typeof createIconSet === 'function' ? createIconSet : addStaticIcons

            return createConfig(function() {
                return fetch.fetchAvidAvalancheQuebec()
                        .then(fetch.filterAvidByLocation(avid_mappings.byName[region]))
                        .then(avid.parseAvid(region, name))
                        .then(addOwner('avalanche-canada'))
                        .then(createIconSet(timezone))
            })
        },
        avalx: function(avalxRegionId, offset, createIconSet) {
            offset = typeof offset === 'number' ? offset : 1
            createIconSet = typeof createIconSet === 'function' ? createIconSet : addStaticIcons

            return createConfig(function() {
                return fetch.fetchAvalx2019(avalxRegionId)
                    .then(parseAvalx(region))
                    .then(createIconSet(timezone))
                    .then(fixAvalxDangerRatingDates(offset))
                    .then(addOwner('avalanche-canada'))
            })
        },
        parks: function(regionId, offset, createIconSet) {
            createIconSet = typeof createIconSet === 'function' ? createIconSet : addStaticIcons
            offset = typeof offset === 'number' ? offset : 1

            return createConfig(function() {
                return fetch.fetchParks(regionId)
                    .then(parseAvalx(region))
                    .then(createIconSet(timezone))
                    .then(fixAvalxDangerRatingDates(offset))
                    .then(addOwner('parks-canada'))
            })
        }
    }
}

module.exports = {
    cached_regions: Object.assign({}, AVCAN, KCOUNTRY, PARKS, AVQ),
}
