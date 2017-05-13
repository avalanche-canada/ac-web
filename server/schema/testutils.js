var fs = require('fs');
var Ajv = require('ajv');
var hzrSchema = require('./hzr/schema.json');
var minSchema = require('./report_data');
var assert = require('assert');

module.exports.loadValidMin = () => {
    var str = fs.readFileSync(__dirname + '/test_data/test-obs.json');
    return JSON.parse(str);
};
module.exports.loadValidHzr = () => {
    var str = fs.readFileSync(__dirname + '/test_data/hzr-report.json');
    return JSON.parse(str);
};

module.exports.assertValidMin = (json, name) => {
    var ajv = new Ajv();
    var validate = ajv.compile(minSchema.jsonSchema);
    var ajvValid = validate(json);
    assert(ajvValid, JSON.stringify(validate.errors, null, '  '));
};
module.exports.assertNotValidMin = (json, name) => {
    var ajv = new Ajv();
    var validate = ajv.compile(minSchema.jsonSchema);
    var ajvValid = validate(json);
    assert(!ajvValid, '"' + name + '" validated. expected failure');
    //console.log(JSON.stringify(validate.errors, null, '  '))
};
module.exports.assertValid = (json, name) => {
    var ajv = new Ajv();
    var validate = ajv.compile(hzrSchema);
    var ajvValid = validate(json);
    assert(ajvValid, JSON.stringify(validate.errors, null, '  '));
};

module.exports.assertNotValid = (json, name) => {
    var ajv = new Ajv();
    var validate = ajv.compile(hzrSchema);
    var ajvValid = validate(json);
    assert(!ajvValid, '"' + name + '" validated. expected failure');
    //console.log(JSON.stringify(validate.errors, null, '  '))
};
