/* globals describe: true, it: true */

var assert = require('assert')
var min = require('./report_data')
var Ajv = require('ajv');

var hzrSchema = require('./hzr/schema.json')

var assertValid = (json, name) => {
    var ajv = new Ajv(); 
    var validate = ajv.compile(hzrSchema)
    var ajvValid = validate(json);
    assert(ajvValid,  JSON.stringify(validate.errors, null, '  '));
}
var assertNotValid = (json, name) => {
    var ajv = new Ajv(); 
    var validate = ajv.compile(hzrSchema)
    var ajvValid = validate(json);
    assert(!ajvValid, '"'+name+'" validated. expected failure')
}

describe('hzr schema', function() {
    it('rejects empty strings for text elements', function() {
        assertNotValid(require('./test_data/hzr-empty-strings.json'), 'empty-strings')
    });

    it('rejects non yes/no values for critical Factors', function() {
        assertNotValid(require('./test_data/hzr-malformed-criticalfactors.json'), 'yes/no critial factors')
    });
});

