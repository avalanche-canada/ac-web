var express = require('express');
var router = express.Router();
var feature_metadata = require('./metadata');

var STATIC_METADATA = JSON.stringify(feature_metadata);

router.get('/metadata', function(req, res) {
    res.set('Content-Type', 'application/json').send(STATIC_METADATA);
});

module.exports = router;
