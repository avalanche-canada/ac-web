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

var BULLETIN_NOT_FOUND = 'BULLETIN_NOT_FOUND';
var NEW_AVALX_START_DATE = '2016-10-01';
var AVALX2016_ENDPOINT = 'http://avalx2016.avalanche.ca/public/CAAML-eng.aspx';

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

// Setup Region names for validation

var regionNames = regionData.features
    .filter(r => r.properties.owner === 'avalanche-canada')
    .map(r => r.id);

var router = express.Router();

var ARCHIVE_DBURL = process.env.ARCHIVE_DBURL;

var BULLETIN_QUERY =
    '  SELECT                             ' +
    '       B.*                           ' +
    '  FROM bulletin B                    ' +
    '  JOIN bulletin_region R             ' +
    '      ON R.region_id = B.region_id   ' +
    '  WHERE R.link = $1                  ' +
    '        AND B.date_issued < $2       ' +
    '        AND B.valid_until > $2       ' +
    '  ORDER BY B.date_issued DESC LIMIT 1';

var AVPROB_QUERY =
    '  SELECT *                 ' +
    '  FROM problem             ' +
    '  WHERE bulletin_id = $1   ';

var DANGER_QUERY =
    '  SELECT *                ' +
    '  FROM danger_rating       ' +
    '  WHERE bulletin_id = $1   ' +
    '  ORDER BY sort_order ASC  ';

router.get('/:date/:region.json', (req, res) => {
    var date = moment(req.params.date, moment.ISO_8601);
    if (!date.isValid()) {
        return res.status(404).end();
    }
    if (
        typeof ['forecast-regions'][req.params.region] !== 'undefined' &&
        metadata['forecast-regions'][req.params.region]['type'] != 'avalx'
    ) {
        return res.status(404).end();
    }
    if (date.isBefore(NEW_AVALX_START_DATE)) {
        return oldAvalx(req, res);
    } else {
        return newAvalx(req, res);
    }
});

function newAvalx(req, res) {
    var region = req.params.region;
    var region_id = avalxMapping[region];
    var date = moment(req.params.date, moment.ISO_8601);
    if (typeof region_id === 'undefined') {
        res.status(404).end();
        return;
    }

    request(
        {
            url: AVALX2016_ENDPOINT,
            qs: { r: region_id, d: date.format('YYYY-MM-DD') },
        },
        (error, resp, xmlbody) => {
            if (error) {
                console.log(
                    'Error retreiving forcast from 2016 AvalX Server:',
                    err,
                    err.stack
                );
                return res
                    .status(500)
                    .json({
                        error: error,
                        msg: 'Error retreiving forcast from 2016 AvalX Server',
                    });
            }
            xml2js.parseString(xmlbody, function(err, caamlJson) {
                if (err) {
                    return res
                        .status(500)
                        .json({
                            error: err,
                            msg: 'Error parsing CAAML forecast',
                        });
                }
                res.status(200).json(avalx.parksForecast(caamlJson, region));
            });
        }
    );
}

function oldAvalx(req, res) {
    // Validate :region is something we know about
    // TODO(wnh): Maybe not since its all old stuff and regions are in flux?
    var regionId = req.params.region;
    if (regionNames.indexOf(regionId) === -1) {
        res.status(404).end();
        return;
    }

    // Parse time and validete it is full ISO_8601 date-time with timezone info
    // TODO(wnh): force the TIMEZONE on tis date
    var date = moment(req.params.date, moment.ISO_8601);
    if (!date.isValid()) {
        res.status(404).end();
        return;
    }

    pg_query(BULLETIN_QUERY, [regionId, date.utc().format()])
        .then(getFirstBulletin)
        .then(getAvProblems)
        .then(getDangerRatings)
        // We really need the `spread` method on es6 promises
        .then(res => {
            return generateJsonBulletin(regionId, res[0], res[1], res[2]);
        })
        .then(j => {
            res.status(200).send(j).end();
        })
        .catch(err => {
            if (err.message === BULLETIN_NOT_FOUND) {
                res.status(404).json({ error: 'Bulletin not found' });
            } else {
                res.status(500).json({ error: err.message });
                console.log('CONNECTION ERR:', err);
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
    var until = moment(bulletin.valid_until);
    var out_bulletin = {
        id: 'bid_' + bulletin.bulletin_id,
        region: region,
        dateIssued: issued.utc().format(),
        validUntil: until.utc().format(),
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
    var ROOT = 'http://www.avalanche.ca/assets/images';

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
        likelihood: ROOT +
            '/Likelihood/Likelihood-' +
            prob.likelyhood_typical +
            '_EN.png',
        expectedSize: ROOT +
            '/size/Size-' +
            sizemin +
            '-' +
            sizemax +
            '_EN.png',
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
