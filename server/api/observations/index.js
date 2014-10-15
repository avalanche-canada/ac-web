var _ = require('lodash');
var express = require('express');
var router = express.Router();
var obs = require('./observations');

router.get('/', function(req, res) {
    // todo: need to delete original url prop, could clone then serve.
    // regions.features.forEach(function (r) { delete r.properties.url; });
    res.json(obs);
});

module.exports = router;