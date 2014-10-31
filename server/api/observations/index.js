var _ = require('lodash');
var express = require('express');
var router = express.Router();
var moment = require('moment');
var policy = require('s3-policy');
var obs = require('./observations');
var uuid = require('node-uuid');
var moment = require('moment');
var config = require('../../config/environment');

router.get('/', function(req, res) {
    var period;
    var limit;
    var filtered;

    if(req.query.period && /^\d+:(hours|days|months)$/g.test(req.query.period)) { // ?period=2:hours|days|months
        period = req.query.period.split(':');
        limit = moment().subtract(period[0], period[1]);

        filtered = _.filter(obs.features, function (ob) {
            return moment(ob.properties.date).isAfter(limit);
        });

        return res.json({
            type: 'FeatureCollection',
            features: filtered
        });
    } else {
        res.json(obs);
    }
});

router.get('/uploads/s3-policy', function (req, res) {
    var s3Policy = policy({
        secret: config.aws.uploader.secretKey,
        length: 5000000,
        bucket: config.aws.uploader.bucket,
        name: 'obs/quick' + moment().format('/YYYY/MM/DD/'),
        expires: new Date(Date.now() + 60000),
        acl: 'private',
        type: ''
    });

    s3Policy.key = config.aws.uploader.accessKeyId;

    res.json(s3Policy);
});

module.exports = router;