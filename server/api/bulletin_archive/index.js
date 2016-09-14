'use strict';

var express = require('express');
var moment  = require('moment');
var mssql   = require('mssql');
var _       = require('lodash');

var BULLETIN_NOT_FOUND = "BULLETIN_NOT_FOUND"

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
    "AspectNorth":      "N",
    "AspectNorthEast":  "NE",
    "AspectEast":       "E",
    "AspectSouthEast":  "SE",
    "AspectSouth":      "S",
    "AspectSouthWest":  "SW",
    "AspectWest":       "W",
    "AspectNorthWest":  "NW",
};


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

router.get('/:date/:region.json', (req, res) => {
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

    var conn;
    try {
        conn = mssql.connect(ARCHIVE_DBURL)
    } catch(err) {
        console.log('Error connecting to Forecast Archive DB:', err, err.stack) 
        res.status(503).json({error: 'Error connecting to Forecast Archive Database'})
        return
    }
    var json = conn
    .then(() => {
        return (
            new mssql.Request()
                .input('region', regionId)
                .input('date',   date.utc().format())
                .query(BULLETIN_QUERY)
        );
    })
    .then(getFirstBulletin)
    .then(getAvProblems)
    .then(getDangerRatings)
    // We really need the `spread` method on es6 promises
    .then((res) => {
        return generateJsonBulletin(regionId, res[0], res[1], res[2])
    })
    .then((j) =>{
        res.status(200).send(j).end();
    })
    .catch((err)=>{
        if(err.message === BULLETIN_NOT_FOUND) {
            res.status(404).json({error: "Bulletin not found"})
        } else {
            res.status(500).json({error: err.message})
            console.log('CONNECTION ERR:', err);
        }
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
        throw new Error(BULLETIN_NOT_FOUND)
    }
    return bulletins[0];
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
    var issued = moment(bulletin.DateIssued);
    var until  = moment(bulletin.ValidUntil);
    var out_bulletin = {
        id:             'bid_' + bulletin.bulletinID,
        region:         region,
        dateIssued:     issued.utc().format(),
        validUntil:     until.utc().format(),
        forecaster:     bulletin.IssuedBy,
        bulletinTitle:  bulletin.Header,
        highlights:     bulletin.Headline,
        confidence:     bulletin.Confidence,
        avalancheSummary:  bulletin.AvalancheActivity,
        snowpackSummary:   bulletin.SnowPack,
        weatherForecast:   bulletin.Outlook,
    };
    out_bulletin['dangerRatings'] = filterRatingsForRegion(region, ratings).map(formatDangerRating(issued));
    out_bulletin['problems']      = problems.filter((p) => p.ShowToPublic).map(formatAvProblem(issued));
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
        console.log(date.format(), problem);
        return {
            type: problem.Type,
            likelihood: formatLikelihood(problem),
            travelAndTerrainAdvice: problem.TravelAdvisory,
            comment: problem.Comments,
            expectedSize: { min: String(problem.SizeMin), max: String(problem.SizeMax), },
            aspects: formatAspects(problem),
            icons: formatIcons(problem),
            elevations: formatElevations(problem),
        };
    }
}

function formatIcons(prob) {
    var ROOT = "http://www.avalanche.ca/assets/images"

    var sizemin = prob.SizeMin*10;
    var sizemax = prob.SizeMax*10;

    var aspects = formatAspects(prob);
    var ha = (a) => (aspects.indexOf(a) > -1) ? '1' : '0';
    var compass = [
        ha("N"),
        ha("NE"),
        ha("E"),
        ha("SE"),
        ha("S"),
        ha("SW"),
        ha("W"),
        ha("NW"),
    ].join('-');

    var elev = formatElevations(prob);
    var he = (e) => (elev.indexOf(e) > -1) ? '1' : '0'; 
    var mtn = [he('Alp'), he('Tln'), he('Btl')].join('-');

    return {
        "likelihood":   ROOT + "/Likelihood/Likelihood-" + prob.LikelyhoodTypical + "_EN.png",
        "expectedSize": ROOT + "/size/Size-"+sizemin+"-"+sizemax+"_EN.png",
        "aspects":      ROOT + "/Compass/compass-"+compass+"_EN.png",
        "elevations":   ROOT + "/Elevation/Elevation-"+mtn+"_EN.png",
    };
}

function formatAspects(prob) {
    return _.keys(STATIC_ASPECTS)
        .filter((a) => prob.hasOwnProperty(a) && prob[a])
        .map((a) => STATIC_ASPECTS[a]);
}

function formatLikelihood(p) {
    return STATIC_LIKELIHOOD[p.LikelyhoodTypical];
}

function formatElevations(p) {
    var elv = [];
    if(p.Alpine)   { elv.push("Alp") };
    if(p.Treeline) { elv.push("Tln") };
    if(p.Below)    { elv.push("Btl") };
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
        d.add(rating.SortOrder - 1, 'days');
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
