var express = require('express');
var router = express.Router();
var _ = require('lodash');
var multiparty = require('multiparty');
var hzrUtils = require('./hzr-utils');
var moment = require('moment');
var changeCase = require('change-case');
var logger = require('../../logger.js');
var config = require('../../config/environment');

function mapWebHZRResponse(hzr, req) {
    return _.reduce(
        hzr,
        function(results, r, key) {
            results[key] = r;
            results[key].focusUrl =
                'http://' + req.get('host') + '/forecast/' + r.hotzoneid;
            results[key].new =
                r.dateissued >
                moment()
                    .subtract(1, 'days')
                    .unix();
            results[key].report.thumbs = r.report.uploads.map(function(key) {
                return 'http://' + req.get('host') + '/api/min/uploads/' + key;
            });
            return results;
        },
        []
    );
}

router.post('/submissions', function(req, res) {
    console.log(req.get('content-type'));
    var form = new multiparty.Form();
    form.parse(req);

    hzrUtils.saveHZR(req.user, form, function(err, hzr) {
        if (err) {
            logger.log(
                'info',
                'Error saving hot zone report: %s',
                JSON.stringify(err)
            );
            res.send(500, {
                error: 'There was an error while saving your submission.',
            });
        } else {
            res.json(201, hzr);
        }
    });
});

router.get('/submissions', function(req, res) {
    logger.log('info', 'fetching hot zone reports');

    hzrUtils.getReports(function(err, hzr) {
        if (err) {
            console.log(err);
            res.send(500, {
                error: 'error retrieving reports: ' + JSON.stringify(err),
            });
        } else {
            mapWebHZRResponse(hzr, req);
            res.json(hzr);
        }
    });
});

router.get('/submissions/:subid', function(req, res) {
    var subid = req.params.subid;

    hzrUtils.getReport(subid, req.query.client, function(err, hzr) {
        if (err) {
            res.send(500, { error: 'error retreiving submission' });
        } else {
            if (req.query && req.query.client) {
                hzr = mapWebHZRResponse(hzr, req);
            }
            res.json(hzr[0]);
        }
    });
});

router.get('/:type/icon.svg', function(req, res) {
    var type = req.params.type;

    if (type === 'active') {
        res.sendFile(config.root + '/server/images/hzr/circle_blue.svg');
    } else {
        res.sendFile(config.root + '/server/images/hzr/circle_grey.svg');
    }
});

module.exports = router;
