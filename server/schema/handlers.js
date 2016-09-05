



var express = require('express');

var router = express.Router();

var report_data = require('./report_data');

router.get('/min-16.09', (req, res) => {
    var schema = Object.assign({id:'http://www.avalanche.ca/schema/min-16.09'}, report_data.jsonSchema);
    res.json(schema);
})

module.exports = router;

