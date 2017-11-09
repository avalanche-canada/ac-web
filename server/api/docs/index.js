'user strict';

var express = require('express');
var yaml = require('js-yaml');
var path = require('path');
var fs = require('fs');

var router = express.Router();

router.get('/', function(req, res) {
    return res.sendFile(path.join(__dirname, 'doc_index.html'));
});
router.get('/view', function(rep, res) {
    return res.sendFile(path.join(__dirname, 'swagger-ui.html'));
});

var JSON_SCHEMA = yaml.safeLoad(
    fs.readFileSync(path.join(__dirname, 'swagger.yaml'))
);
router.get('/swagger.json', function(req, res) {
    return res
        .status(200)
        .json(JSON_SCHEMA)
        .end();
});

module.exports = router;
