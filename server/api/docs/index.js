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

function loadYaml(fname) {
    return yaml.safeLoad(
        fs.readFileSync(path.join(__dirname, fname))
    );
}
var JSON_SCHEMAS =  {
    v1: loadYaml('swagger_v1.yaml'),
    v2: loadYaml('swagger_v2.yaml'),
}
router.get('/swagger_:version.json', function(req, res) {

    if (Object.keys(JSON_SCHEMAS).indexOf(req.params.version) == -1) {
        return res
            .status(404)
            .end("Not found")
    }

    return res
        .status(200)
        .json(JSON_SCHEMAS[req.params.version])
        .end();
});

module.exports = router;
