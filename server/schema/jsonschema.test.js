/* globals describe: true, it: true */

var assert = require('assert');
var Ajv = require('ajv');

var min = require('./report_data');

var testObs = require('./test_data/test-obs.json');

describe('json schema', function() {
    describe('MIN schema', function() {
        //test('tv4 thinks it is a valid json schema', function(done) {
        //   // var validateSchema = jsen({"$ref": "http://json-schema.org/draft-04/schema#"});
        //    var tv4 = require('tv4');
        //    var metaSchema = {"$ref": "http://json-schema.org/draft-04/schema#"};
        //    var tv4valid = tv4.validateResult(min.jsonSchema, metaSchema, (isvalid, validationError) => {
        //        if(isvalid) {
        //            done();
        //        } else {
        //            done(validationError);
        //        }
        //
        //    });
        //});
        test('validates as valid jsonschema with ajv', function() {
            // var validateSchema = jsen({"$ref": "http://json-schema.org/draft-04/schema#"});
            var ajv = new Ajv();
            var validate = ajv.compile({
                $ref: 'http://json-schema.org/draft-04/schema#',
            });
            var ajvValid = validate(min.jsonSchema);

            assert(ajvValid, JSON.stringify(validate.errors, null, '  '));
        });
        test('validiates a test object', function() {
            var ajv = new Ajv();
            var validate = ajv.compile(min.jsonSchema);
            var isSchemaValid = validate(testObs);
            assert(
                isSchemaValid,
                'schema rejected test object:\n' +
                    JSON.stringify(validate.errors, null, '  ')
            );
        });
    });
});
