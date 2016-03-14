var express = require('express');
var router = express.Router();
var _ = require('lodash');
var jwt = require('express-jwt');
var multiparty = require('multiparty');
var hzrUtils = require('./hzr-utils');
var moment = require('moment');
var changeCase = require('change-case');
var logger = require('../../logger.js');

var jwtCheck = jwt({
  secret: new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
  audience: process.env.AUTH0_CLIENT_ID
});

router.post('/submissions', jwtCheck, function (req, res) {
    console.log(req.get('content-type'));
    var form = new multiparty.Form();
    form.parse(req);

    hzrUtils.saveHZR(req.user, form, function (err, hzr) {
        if (err) {
            logger.log('info','Error saving hot zone report: %s', JSON.stringify(err));
            res.send(500, {error: 'There was an error while saving your submission.'})
        } else {
            res.json(201, hzr);
        }
    });
});

router.get('/submissions', function (req, res) {
    logger.log('info', 'fetching hot zone reports');

    hzrUtils.getReports(function (err, hzr) {
        if (err) {
            res.send(500, {error: 'error retrieving reports'})
        } else {
            res.json(hzr);
        }
    });
});

// router.get('/submissions/:subid', function (req, res) {
//     var subid = req.params.subid;

//     hzrUtils.getReport(subid, req.query.client, function (err, sub) {
//         if (err) {
//             res.send(500, {error: 'error retrieving report'})
//         } else {
//             if(req.query && req.query.client){
//                 sub = mapWebSubResponse(sub, req);
//             }
//             res.json(sub);
//         }
//     });
// });

module.exports = router;
