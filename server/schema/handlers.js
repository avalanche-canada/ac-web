var express = require('express');

var router = express.Router();

var report_data = require('./report_data');

router.get('/min-16.09', (req, res) => {
    res.json(report_data.jsonSchema);
});

module.exports = router;
