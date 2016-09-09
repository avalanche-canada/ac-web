



var express = require('express');

var router = express.Router();

var report_data = require('./report_data');
var hzrSchema   = require('./hzr/schema.json');

router.get('/min-16.09', (req, res) => {
    res.json(report_data.jsonSchema);
})

router.get('/hzr-16.09', (req, res) => {
    res.json(hzrSchema);
})
module.exports = router;

