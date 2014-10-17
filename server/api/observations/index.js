var _ = require('lodash');
var express = require('express');
var router = express.Router();
var moment = require('moment');
var obs = require('./observations');

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

module.exports = router;