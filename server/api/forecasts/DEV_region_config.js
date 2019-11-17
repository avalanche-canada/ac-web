var _ = require('lodash');
var xml2js = require('xml2js');
var Q = require('q');
var logger = require('../../logger');
var fetch    = require('./fetch');
var avalx    = require('./avalx');
var avid    = require('./avid');
var prismic = require('./prismic');
var icon_set = require('./icon_set');
var reg_metadata = require('../../data/season')
var addDays  = require('date-fns/add_days');

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

function lognow(msg) {
    return function(data) {
        logger.debug(msg, data);
        return data;
    }
}

var AVCAN = {
    'northwest-coastal': {
        metadata: reg_properties['northwest-coastal'],
        fetchNow: function() { 
            // return fetch.fetchAvalx2019(16)
            //             .then(parseAvalx('northwest-coastal'))
            //             .then(lognow('parseAvalx(northwest-coastal)'))
            //             .then(fixAvalxDangerRatingDates(1))
            //             .then(lognow('fixAvalxDangerRatingDates(northwest-coastal)'))
            //             .then(addOwner('avalanche-canada'))
            //             .then(lognow('addOwner(northwest-coastal)'))
            //             .then(addStaticIcons('America/Vancouver'))
            //             .then(lognow('addStaticIcons(northwest-coastal)'))
            //             .catch(lognow('error(northwest-coastal)') )
            
            return fetch.fetchAvid()
                        .then(fetch.filterAvidByLocation('afbfd8d9-6c0b-41e1-9451-8b1f66168aef'))
                        .then(avid.parseAvid('northwest-coastal', 'Northwest - Coastal'))
                        .then(addOwner('avalanche-canada'))
                        .then(addStaticIcons('America/Vancouver')); 
        },
    },
    'northwest-inland': {
        metadata: reg_properties['northwest-inland'],
        fetchNow: function() { 
            // return fetch.fetchAvalx2019(17)
            //             .then(parseAvalx('northwest-inland'))
            //             .then(fixAvalxDangerRatingDates(1))
            //             .then(addOwner('avalanche-canada'))
            //             .then(addStaticIcons('America/Vancouver'));

            return fetch.fetchAvid()
                        .then(fetch.filterAvidByLocation('79422b9a-add7-41d5-b042-4aab53f7c191'))
                        .then(avid.parseAvid('northwest-inland', 'Northwest - Inland'))
                        .then(addOwner('avalanche-canada'))
                        .then(addStaticIcons('America/Vancouver')); 
        },
    },
    'sea-to-sky': {
        metadata: reg_properties['sea-to-sky'],
        fetchNow: function() { 
            // return fetch.fetchAvalx2019(14)
            //             .then(parseAvalx('sea-to-sky'))
            //             .then(fixAvalxDangerRatingDates(1))
            //             .then(addOwner('avalanche-canada'))
            //             .then(addStaticIcons('America/Vancouver'));
            
            return fetch.fetchAvid()
                        .then(fetch.filterAvidByLocation('91a91bf7-1965-4288-88f5-36d6f1a93017'))
                        .then(avid.parseAvid('sea-to-sky', 'Sea to Sky'))
                        .then(addOwner('avalanche-canada'))
                        .then(addStaticIcons('America/Vancouver')); 

        },
    },
    'south-coast-inland': {
        metadata: reg_properties['south-coast-inland'],
        fetchNow: function() { 
            // return fetch.fetchAvalx2019(15)
            //             .then(parseAvalx('south-coast-inland'))
            //             .then(fixAvalxDangerRatingDates(1))
            //             .then(addOwner('avalanche-canada'))
            //             .then(addStaticIcons('America/Vancouver'));

            return fetch.fetchAvid()
                        .then(fetch.filterAvidByLocation('812626e5-4860-4d7b-bf7f-ab92ed7d0719'))
                        .then(avid.parseAvid('south-coast-inland', 'South Coast - Inland'))
                        .then(addOwner('avalanche-canada'))
                        .then(addStaticIcons('America/Vancouver')); 
        },
    },
    'south-coast': {
        metadata: reg_properties['south-coast'],
        fetchNow: function() { 
            // return fetch.fetchAvalx2019(8)
            //             .then(parseAvalx('south-coast'))
            //             .then(fixAvalxDangerRatingDates(1))
            //             .then(addOwner('avalanche-canada'))
            //             .then(addStaticIcons('America/Vancouver')); 

            return fetch.fetchAvid()
                        .then(fetch.filterAvidByLocation('0c257b42-8c78-4743-a29b-20d2e8071f3a'))
                        .then(avid.parseAvid('south-coast', 'South Coast'))
                        .then(addOwner('avalanche-canada'))
                        .then(addStaticIcons('America/Vancouver')); 
        },
    },
    'north-rockies': {
        metadata: reg_properties['north-rockies'],
        fetchNow: function() { 
            // return fetch.fetchAvalx2019(9)
            //             .then(parseAvalx('north-rockies'))
            //             .then(fixAvalxDangerRatingDates(1))
            //             .then(addOwner('avalanche-canada'))
            //             .then(addMovingIcons('America/Vancouver'));
            
            return fetch.fetchAvid()
                        .then(fetch.filterAvidByLocation('71e52e86-8a5d-4512-aa63-c0b433544a92'))
                        .then(avid.parseAvid('north-rockies', 'North Rockies'))
                        .then(addOwner('avalanche-canada'))
                        .then(addStaticIcons('America/Vancouver')); 
            
        },
    },
    'cariboos': {
        metadata: reg_properties['cariboos'],
        fetchNow: function () { 
            // return fetch.fetchAvalx2019(19)
            //             .then(parseAvalx('cariboos'))
            //             .then(addOwner('avalanche-canada'))
            //             .then(fixAvalxDangerRatingDates(1))
            //             .then(addStaticIcons('America/Vancouver')); 

            // return prismic.fetch('cariboos')
            //               .then(prismic.parse)
            //               .then(addOwner('cariboos'))
            //               .then(addStaticIcons('America/Vancouver'))
            
            return fetch.fetchAvid()
                        .then(fetch.filterAvidByLocation('cc561c27-ce92-4b6d-ab90-ce2224459a88'))
                        .then(avid.parseAvid('cariboos', 'Cariboos'))
                        .then(addOwner('avalanche-canada'))
                        .then(addStaticIcons('America/Vancouver')); 
        },
    },
    'north-columbia': {
        metadata: reg_properties['north-columbia'],
        fetchNow: function() { 
            // return fetch.fetchAvalx2019(18)
            //             .then(parseAvalx('north-columbia'))
            //             .then(fixAvalxDangerRatingDates(1))
            //             .then(addOwner('avalanche-canada'))
            //             .then(addStaticIcons('America/Vancouver'));

            return fetch.fetchAvid()
                        .then(fetch.filterAvidByLocation('a43ffb7b-831d-4a41-bb00-bf8f336bde17'))
                        .then(avid.parseAvid('north-columbia', 'North Columbia'))
                        .then(addOwner('avalanche-canada'))
                        .then(addStaticIcons('America/Vancouver')); 
                    }
                },
    'south-columbia': {
        metadata: reg_properties['south-columbia'],
        fetchNow: function() { 
            return fetch.fetchAvid()
                        .then(fetch.filterAvidByLocation('0f7dd79e-b212-408d-9fe1-22e8c73e2983'))
                        .then(avid.parseAvid('south-columbia', 'South Columbia'))
                        .then(addOwner('avalanche-canada'))
                        .then(addStaticIcons('America/Vancouver')); 

            // return fetch.fetchAvalx2019(10)
            //             .then(parseAvalx('south-columbia'))
            //             .then(addOwner('avalanche-canada'))
            //             .then(fixAvalxDangerRatingDates(1))
            //             .then(addStaticIcons('America/Vancouver')); 
        },
    },
    'purcells': {
        metadata: reg_properties['purcells'],
        fetchNow: function() { 
            return fetch.fetchAvid()
                        .then(fetch.filterAvidByLocation('f11e32be-cd3d-4e4a-b093-137993194bbe'))
                        .then(avid.parseAvid('purcells', 'Purcells'))
                        .then(addOwner('avalanche-canada'))
                        .then(addStaticIcons('America/Vancouver')); 

            // return fetch.fetchAvalx2019(11)
            //             .then(parseAvalx('purcells'))
            //             .then(addOwner('avalanche-canada'))
            //             .then(fixAvalxDangerRatingDates(1))
            //             .then(addStaticIcons('America/Vancouver')); 
        },
    },
    'kootenay-boundary': {
        metadata: reg_properties['kootenay-boundary'],
        fetchNow: function() { 
            return fetch.fetchAvid()
                        .then(fetch.filterAvidByLocation('1e44f685-41ce-4ae2-aecf-b1ffd9f1ac0a'))
                        .then(avid.parseAvid('kootenay-boundary', 'Kootenay Boundary'))
                        .then(addOwner('avalanche-canada'))
                        .then(addStaticIcons('America/Vancouver')); 

            // return fetch.fetchAvalx2019(6)
            //             .then(parseAvalx('kootenay-boundary'))
            //             .then(addOwner('avalanche-canada'))
            //             .then(fixAvalxDangerRatingDates(1))
            //             .then(addStaticIcons('America/Vancouver')); 
        },
    },
    'south-rockies': {
        metadata: reg_properties['south-rockies'],
        fetchNow: function() { 
            return fetch.fetchAvid()
                        .then(fetch.filterAvidByLocation('dec02ecc-9845-4f33-96b2-0b8aad1ce3a1'))
                        .then(avid.parseAvid('south-rockies', 'South Rockies'))
                        .then(addOwner('avalanche-canada'))
                        .then(addStaticIcons('America/Vancouver')); 

            // return fetch.fetchAvalx2019(13)
            //             .then(parseAvalx('south-rockies'))
            //             .then(addOwner('avalanche-canada'))
            //             .then(fixAvalxDangerRatingDates(1))
            //             .then(addStaticIcons('America/Vancouver')); 
        },
    },
    'lizard-range': {
        metadata: reg_properties['lizard-range'],
        fetchNow: function() {
            // return fetch.fetchAvalx2019(12)
            //             .then(parseAvalx('lizard-range'))
            //             .then(fixAvalxDangerRatingDates(1))
            //             .then(addOwner('avalanche-canada'))
            //             .then(addStaticIcons('America/Vancouver'));

            return fetch.fetchAvid()
                        .then(fetch.filterAvidByLocation('0ecb495e-de78-4063-bd81-4d4499856cde'))
                        .then(avid.parseAvid('lizard-range', 'Lizard Range and Flathead'))
                        .then(addOwner('avalanche-canada'))
                        .then(addStaticIcons('America/Vancouver'));
        }
    },
    'yukon': {
        metadata: reg_properties['yukon'],
        fetchNow: function() { 
            return fetch.fetchAvid()
                        .then(fetch.filterAvidByLocation('d67af35a-9544-4f69-a0e8-721c3ad66906'))
                        .then(avid.parseAvid('yukon', 'Yukon'))
                        .then(addOwner('avalanche-canada'))
                        .then(addStaticIcons('America/Vancouver')); 
        },
    },
};
            
            
var KCOUNTRY =  {
    'kananaskis': {
        metadata: reg_properties['kananaskis'],
        fetchNow: function() { 
            // return fetch.fetchAvalx2016(7)
            //             .then(parseAvalx('kananaskis'))
            //             .then(fixAvalxDangerRatingDates(1))
            //             .then(addOwner('avalanche-canada'))
            //             .then(addStaticIcons('America/Edmonton'));

            return fetch.fetchAvid()
                        .then(fetch.filterAvidByLocation('b9714237-ddd9-4d54-9233-ff46e0668065'))
                        .then(avid.parseAvid('kananaskis', 'Kananaskis'))
                        .then(addOwner('avalanche-canada'))
                        .then(addStaticIcons('America/Vancouver')); 
        },
    },
};


// PARKS

var PARKS = {
    'glacier': {
        fetchNow: function() { return fetch.fetchParks(3).then(parseAvalx('glacier')).then(addStaticIcons('America/Vancouver')); },
        metadata: reg_properties['glacier'],
    },
    'little-yoho': {
        fetchNow: function() { return fetch.fetchParks(5).then(parseAvalx('little-yoho')).then(addStaticIcons('America/Edmonton')); },
        metadata: reg_properties['little-yoho'],
    },
    'banff-yoho-kootenay': {
        fetchNow: function() { return fetch.fetchParks(1).then(parseAvalx('banff-yoho-kootenay')).then(addStaticIcons('America/Edmonton')); },
        metadata: reg_properties['banff-yoho-kootenay'],
    },
    'jasper': {
        fetchNow: function() { return fetch.fetchParks(2).then(parseAvalx('jasper')).then(addStaticIcons('America/Edmonton')); },
        metadata: reg_properties['jasper'],
    },
    'waterton': {
        fetchNow: function() { return fetch.fetchParks(4).then(parseAvalx('waterton')).then(addStaticIcons('America/Edmonton')); },
        metadata: reg_properties['waterton'],
    },
};

module.exports = {
    cached_regions: Object.assign({}, AVCAN, KCOUNTRY, PARKS),
}
