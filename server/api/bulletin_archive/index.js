'use strict';

var express = require('express');
var moment = require('moment');
var pg = require('pg');
var _ = require('lodash');
var request = require('request');
var xml2js = require('xml2js');
var url = require('url');
var querystring = require('querystring');

var metadata = require('../features/metadata');
var regionData = require('../../data/season').forecast_regions;
var avalxMapping = require('../../data/season/2016/avalxMapping.json');
var avalx = require('../forecasts/avalx');
var logger = require('../../logger');

var BULLETIN_NOT_FOUND = 'BULLETIN_NOT_FOUND';
var NEW_AVALX_START_DATE = '2016-10-01';
var AVALX2016_ENDPOINT = process.env.AVALX2016_ENDPOINT || 'http://avalx2016.avalanche.ca/public/CAAML-eng.aspx';

const db_params = url.parse(process.env.BULLETIN_ARCHIVE_DB);
const db_auth = db_params.auth.split(':');

var db_use_ssl = true;
if (db_params.search) {
    const db_opts = querystring.parse(db_params.search.slice(1));
    if (db_opts.use_ssl === 'false') {
        db_use_ssl = false;
    }
}

const config = {
    user: db_auth[0],
    password: db_auth[1],
    host: db_params.hostname,
    port: db_params.port,
    database: db_params.pathname.split('/')[1],
    ssl: db_use_ssl,
};

var pg_pool = new pg.Pool(config);

function pg_query(text, values) {
    var p = new Promise(function(resolve, reject) {
        pg_pool.query(text, values, function(err, result) {
            if (err) {
                reject({ error: err, query: text });
            }
            resolve(result);
        });
    });
    return p;
}

// TODO(wnh): merge your other work and make a single collection of this static
// data
var STATIC_RATINGS = [
    'N/A:No Rating',
    '1:Low',
    '2:Moderate',
    '3:Considerable',
    '4:High',
    '5:Extreme',
];

var STATIC_LIKELIHOOD = {
    1: 'Unlikely',
    2: 'Possible - Unlikely',
    3: 'Possible',
    4: 'Likely - Possible',
    5: 'Likely',
    6: 'Very Likely - Likely',
    7: 'Very Likely',
    8: 'Certain - Very Likely',
    9: 'Certain',
};

var STATIC_ASPECTS = {
    aspect_north: 'N',
    aspect_north_east: 'NE',
    aspect_east: 'E',
    aspect_south_east: 'SE',
    aspect_south: 'S',
    aspect_south_west: 'SW',
    aspect_west: 'W',
    aspect_north_west: 'NW',
};

/*
 * Mappings for old renamed regions to map to the same text `id`
 */
var REGION_MAPPINGS = {
    banff: [7],
    'bighorn-country-ab': [16],
    glacier: [6],
    'haute-gaspesie': [15],
    jasper: [8],
    kananaskis: [10],
    'kootenay-boundary': [4],
    lizardrange: [20],
    cariboos: [2, 26],
    'north-columbia': [27],
    'north-rockies-bc': [13],
    'north-shore': [12],
    'northwest-coastal': [24],
    'northwest-inland': [14, 25],
    purcells: [19],
    'sea-to-sky': [22],
    'south-coast': [1, 23],
    'south-columbia': [3, 18],
    'south-rockies': [5, 21],
    'south-rockies-tech': [34],
    'van-island': [31],
    waterton: [9],
    'whistler-blackcomb': [11],
    yukon: [35, 32],
};
// 17 | Special Avalanche Warning             | Special Avalanche Warning
// Setup Region names for validation

var regionNames = regionData.features
    .filter(r => r.properties.owner === 'avalanche-canada')
    .map(r => r.id);

var router = express.Router();

var ARCHIVE_DBURL = process.env.ARCHIVE_DBURL;

var BULLETIN_QUERY =
    ' SELECT                              ' +
    '       B.bulletin_id                     ' +
    '     , B.sponsor_id                      ' +
    '     , B.sponsor_id2                     ' +
    '     , B.region_id                       ' +
    '     , B.header                          ' +
    '     , B.headline                        ' +
    '     , B.spaw                            ' +
    "     , timezone('PST', B.date_issued) as date_issued " +
    '     , B.time_posted                     ' +
    "     , timezone('PST', B.valid_until) as valid_until" +
    '     , B.next_update                     ' +
    '     , B.periodic_date_issued            ' +
    '     , B.periodic_next_update            ' +
    '     , B.confidence                      ' +
    '     , B.avalanche_danger                ' +
    '     , B.travel_advisory                 ' +
    '     , B.avalanche_activity              ' +
    '     , B.snow_pack                       ' +
    '     , B.outlook                         ' +
    '     , B.weather                         ' +
    '     , B.issued_by                       ' +
    '     , B.partner_bulletin                ' +
    '     , B.caa_bulletin                    ' +
    '     , B.archived                        ' +
    '     , B.draft                           ' +
    '     , B.baa1                            ' +
    '     , B.baa2                            ' +
    '     , B.taha                            ' +
    ' FROM bulletin B                     ' +
    '     JOIN bulletin_region R          ' +
    '     ON R.region_id = B.region_id    ' +
    ' WHERE B.region_id = ANY ($1)        ' +
    '     AND B.date_issued < $2          ' +
    '     AND B.valid_until > $2          ' +
    ' ORDER BY B.date_issued DESC LIMIT 1 ';

var AVPROB_QUERY =
    '  SELECT *                 ' +
    '  FROM problem             ' +
    '  WHERE bulletin_id = $1   ';

var DANGER_QUERY =
    '  SELECT *                ' +
    '  FROM danger_rating       ' +
    '  WHERE bulletin_id = $1   ' +
    '  ORDER BY sort_order ASC  ';

router.get('/:date/:region.:format(json|html)', (req, res) => {
    var date = moment(req.params.date, moment.ISO_8601);
    if (!date.isValid()) {
        return res.status(404).end();
    }

    var regionUndefined = typeof(metadata['forecast-regions'][req.params.region]) === 'undefined';

    if (regionUndefined) {
        return res.status(404).end('Region not found');
    } else {
        var regionIsAvalx = metadata['forecast-regions'][req.params.region]['type'] == 'avalx';
        if (!regionIsAvalx) {
            return res.status(404).end('No archive for that region');
        }
    }
    var avalxFn = undefined;
    if (date.isBefore(NEW_AVALX_START_DATE)) {
        logger.debug('BULLETIN_ARCHIVE - Using OLD avalx');
        avalxFn = oldAvalx;
    } else {
        logger.debug('BULLETIN_ARCHIVE - Using NEW avalx');
        avalxFn = newAvalx;
    }
    return avalxFn(req.params.region, req.params.date, function(err, data){
        logger.debug("running from the unified callback!")
        if(err) {
            return res.status(500).json(err);
        }
        if(!data) {
            return res.status(404).end();
        }

        //send the json
        if (req.params.format == 'json')  {
            return res.status(200).json(data);
        } else if (req.params.format == 'html')  {
            //send the html
            var locals = avalx.getTableLocals(data);
            locals.AC_API_ROOT_URL = config.AC_API_ROOT_URL;
            res.render('forecasts/forecast-html', locals, function(render_err, html) {
                if (render_err) {
                    logger.error('bulletin_archive rendering forecast html', {error: err});
                    return res.status(500).end();
                } else {
                    return res.send(html);
                }
            });
        } else {
            return res.status(404).end();
        }

    });
});

function newAvalx(region, date, callback) {
    var region_id = avalxMapping[region];
    var date = moment(date, moment.ISO_8601);
    if (typeof region_id === 'undefined') {
        return callback(null, null);
    }
    request(
        {
            url: AVALX2016_ENDPOINT,
            qs: { r: region_id, d: date.format('YYYY-MM-DD') },
        },
        (error, resp, xmlbody) => {
            if (error) {
                logger.error(
                    'avalx xml fetch: server=%s',
                    AVALX2016_ENDPOINT,
                    error,
                    error.stack
                );
                return callback({
                    error: error,
                    msg: 'Error retreiving forcast from 2016 AvalX Server',
                }, null);
            }
            xml2js.parseString(xmlbody, function(xmlErr, caamlJson) {
                if (xmlErr) {
                    return callback({
                        error: xmlErr,
                        msg: 'Error parsing CAAML forecast',
                    }, null);
                }
                return callback(null, avalx.parksForecast(caamlJson, region));
            });
        }
    );
}

function oldAvalx(regionId, date, callback) {
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
    var mapping = REGION_MAPPINGS[regionId];
    pg_query(BULLETIN_QUERY, [mapping, date.utc().format()])
        .then(getFirstBulletin)
        .then(getAvProblems)
        .then(getDangerRatings)
        // We really need the `spread` method on es6 promises
        .then(res => {
            return generateJsonBulletin(regionId, res[0], res[1], res[2]);
        })
        .then(json_data => {
            return callback(null, json_data);
        })
        .catch(err => {
            logger.error(
                'BULLETIN_ARCHIVE - error getting bulletin',
                err.message
            );
            if (err.message === BULLETIN_NOT_FOUND) {
                return callback(null, null);
            } else {
                logger.error('pg_query old_avalx:', err);
                return callback({ error: err.message }, null);
            }
        });
}

function getAvProblems(bulletin) {
    var probs = pg_query(AVPROB_QUERY, [bulletin.bulletin_id]).then(
        x => x.rows
    );

    return Promise.all([bulletin, probs]);
}

function getDangerRatings(args) {
    var ratings = pg_query(DANGER_QUERY, [args[0].bulletin_id]).then(
        x => x.rows
    );

    return Promise.all([args[0], args[1], ratings]);
}

function getFirstBulletin(bulletins) {
    if (bulletins.rowCount < 1 || bulletins.rows.length < 1) {
        throw new Error(BULLETIN_NOT_FOUND);
    }
    return bulletins.rows[0];
}

/*
 * filterRatingsForRegion takes the 4 danger ratings from a bulletin object
 * (1 nowcast + 3 forecast) and return the appropriate ratings for a region
 * depending on if they forecast in the morning or the day before.
 *     Currently:
 *         Whistler      -> (1 nowcast + 2 forecast)
 *         everyone else -> (3 forecast)
 */
function filterRatingsForRegion(region, ratings) {
    if (region === 'whistler-blackcomb') {
        return [ratings[0], ratings[1], ratings[2]];
    } else {
        return [ratings[1], ratings[2], ratings[3]];
    }
}

function generateJsonBulletin(region, bulletin, problems, ratings) {
    var issued = moment(bulletin.date_issued);
    var out_bulletin = {
        id: 'bid_' + bulletin.bulletin_id,
        region: region,
        dateIssued: bulletin.date_issued,
        validUntil: bulletin.valid_until,
        forecaster: bulletin.issued_by,
        bulletinTitle: bulletin.header,
        highlights: bulletin.headline,
        confidence: bulletin.confidence,
        avalancheSummary: bulletin.avalanche_activity,
        snowpackSummary: bulletin.snow_pack,
        weatherForecast: bulletin.outlook,
    };
    out_bulletin['dangerRatings'] = filterRatingsForRegion(region, ratings).map(
        formatDangerRating(issued)
    );
    out_bulletin['problems'] = problems
        .filter(p => p.show_to_public)
        .map(formatAvProblem(issued));
    return out_bulletin;
}
/*
 * formatAvProblem returns a formating function, useful for calling with `map`
 *  date -> ( Problem_row -> forcastJsonAvProblem)
 *  to actually format:
 *    formatAvProblem(date)(problemObj)
 */
function formatAvProblem(date) {
    return function(problem) {
        return {
            type: problem.type,
            likelihood: formatLikelihood(problem),
            travelAndTerrainAdvice: problem.travel_advisory,
            comment: problem.comments,
            expectedSize: {
                min: String(problem.size_min),
                max: String(problem.size_max),
            },
            aspects: formatAspects(problem),
            icons: formatIcons(problem),
            elevations: formatElevations(problem),
        };
    };
}

function formatIcons(prob) {
    var ROOT = 'https://www.avalanche.ca/assets/images';

    var sizemin = prob.size_min * 10;
    var sizemax = prob.size_max * 10;

    var aspects = formatAspects(prob);
    var ha = a => (aspects.indexOf(a) > -1 ? '1' : '0');
    var compass = [
        ha('N'),
        ha('NE'),
        ha('E'),
        ha('SE'),
        ha('S'),
        ha('SW'),
        ha('W'),
        ha('NW'),
    ].join('-');

    var elev = formatElevations(prob);
    var he = e => (elev.indexOf(e) > -1 ? '1' : '0');
    var mtn = [he('Alp'), he('Tln'), he('Btl')].join('-');

    return {
        likelihood:
            ROOT +
            '/Likelihood/Likelihood-' +
            prob.likelyhood_typical +
            '_EN.png',
        expectedSize:
            ROOT + '/size/Size-' + sizemin + '-' + sizemax + '_EN.png',
        aspects: ROOT + '/Compass/compass-' + compass + '_EN.png',
        elevations: ROOT + '/Elevation/Elevation-' + mtn + '_EN.png',
    };
}

function formatAspects(prob) {
    return _.keys(STATIC_ASPECTS)
        .filter(a => prob.hasOwnProperty(a) && prob[a])
        .map(a => STATIC_ASPECTS[a]);
}

function formatLikelihood(p) {
    return STATIC_LIKELIHOOD[p.likelyhood_typical];
}

function formatElevations(p) {
    var elv = [];
    if (p.alpine) {
        elv.push('Alp');
    }
    if (p.treeline) {
        elv.push('Tln');
    }
    if (p.below) {
        elv.push('Btl');
    }
    return elv;
}

/*
 * formatDangerRating returns a formating function, useful for calling with `map`
 *  date -> ( DangerRating_row -> forcastJsonDangeRating)
 *  to actually format:
 *    formatDangerRating(date)(dangerObj)
 */
function formatDangerRating(date) {
    return function(rating) {
        // This needs to be copied because moment makes dates mutable o_O
        var d = moment(date);
        d.add(rating.sort_order - 1, 'days');
        return {
            date: d,
            dangerRating: {
                alp: STATIC_RATINGS[rating.alpine],
                tln: STATIC_RATINGS[rating.treeline],
                btl: STATIC_RATINGS[rating.below],
            },
        };
    };
}

module.exports = router;
