'use strict';

var express = require('express');
var moment  = require('moment');
var mssql   = require('mssql');
var _       = require('lodash');


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


// Setup Region names for validation
var regionData = require('../forecasts/forecast-regions.json');

var regionNames = regionData.features
    .filter( (r) => r.properties.owner === 'avalanche-canada' )
    .map((r) => r.id);


var router = express.Router();

var ARCHIVE_DBURL = process.env.ARCHIVE_DBURL;

var BULLETIN_QUERY =
    '  select top(1)                    '+
    '       B.*                         '+
    '  from Bulletin B                  '+
    '  join BulletinRegion R            '+
    '      on R.RegionID = B.RegionID   '+
    '  where R.Link = @region           '+
    '        and B.DateIssued < @date   '+
    '        and B.ValidUntil > @date   '+
    '  order by B.DateIssued desc       ';

var AVPROB_QUERY =
    '  select *                '+
    '  from Problem            '+
    '  where BulletinID = @bid ';

var DANGER_QUERY = 
    '  select *                '+
    '  from DangerRating       '+
    '  where BulletinID = @bid '+
    '  order by SortOrder asc  ';

router.get('/:region/:date.json', (req, res) => {
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
    if(! date.isValid()) {
        res.status(404).end();
        return;
    }

    var json = mssql.connect(ARCHIVE_DBURL)
    .then(() => {
        return (new mssql.Request()
            .input('region', regionId)
            .input('date',   date.utc().format())
            .query(BULLETIN_QUERY));
    })
    .then(getFirstBulletin)
    .then(getAvProblems)
    .then(getDangerRatings)
    // We really need the `spread` method on es6 promises
    .then((res) => {
        console.dir(res);
        return generateJsonBulletin(regionId, res[0], res[1], res[2])
    })
    .then((j) =>{
        res.status(200).send(j).end();
    })
    .catch((err)=>{
        console.log('CONNECTION ERR:', err);
    });
});

function getAvProblems(bulletin) {
    var probs = 
        (new mssql.Request())
        .input('bid', bulletin.bulletinID)
        .query(AVPROB_QUERY)
        .then((x) => x);

    return Promise.all([bulletin, probs]);
}

function getDangerRatings(args) {
    var ratings = 
        (new mssql.Request())
        .input('bid', args[0].bulletinID)
        .query(DANGER_QUERY)
        .then((x) => x);

    return Promise.all([args[0], args[1], ratings]);
}

function getFirstBulletin(bulletins) {
    if(bulletins.length < 1) {
        throw Error("Query didnt return a bulletin")
    }
    return bulletins[0];
}


function generateJsonBulletin(region, bulletin, problems, ratings) {
    var issued = moment(bulletin.DateIssued);
    var until  = moment(bulletin.ValidUntil);
    var out_bulletin = {
        id:             'id_' + bulletin.bulletinID,
        region:         region,
        dateIssued:     issued.utc().format(),
        validUntil:     until.utc().format(),
        forecaster:     bulletin.IssuedBy,
        bulletinTitle:  bulletin.Header,
        highlights:     bulletin.Highlights,
        confidence:     bulletin.Confidence,
        avalancheSummary:  bulletin.AvalancheActivity,
        snowpackSummary:   bulletin.SnowPack,
        weatherForecast:   bulletin.Outlook,
    };
    out_bulletin['dangerRatings'] = ratings.map(formatDangerRating(issued));
    out_bulletin['problems']      = []; //problems.map(formatAvProblem(issued));
    return out_bulletin;
}
/*
 * returns a formating function, useful for calling with `map`
 *  to actually format:
 *    formatAvProblem(date)(problemObj)
 */
function formatAvProblem(date) {
    return function(problem) {
        console.log(date.format(), problem);
        return {
            really: 'maybe?'
        };
    }
}

/*
 * returns a formating function, useful for calling with `map`
 *  to actually format:
 *    formatDangerRating(date)(dangerObj)
 */
function formatDangerRating(date) {
    return function(rating) {
        // This needs to be copied because moment makes dates mutable o_O
        var d = moment(date);
        d.add(rating.SortOrder, 'days');
        return {
            date: d,
            dangerRating: {
                alp: STATIC_RATINGS[rating.Alpine],
                tln: STATIC_RATINGS[rating.Treeline],
                btl: STATIC_RATINGS[rating.Below],
            }
        };
    }
}

module.exports = router;
