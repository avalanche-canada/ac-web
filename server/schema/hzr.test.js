/* globals describe: true, it: true */

var min = require('./report_data');
var assert = require('assert');

var testutils = require('./testutils');

describe('hzr schema', function() {
    test('validates the known good test object', function() {
        var valid = testutils.loadValidHzr();
        testutils.assertValid(valid, 'Known good commit');
    });

    test('rejects empty strings for text elements', function() {
        var emptyStrings = testutils.loadValidHzr();
        emptyStrings.treelineTerrainAvoidance.terrainAvoidanceComments = '';
        testutils.assertNotValid(emptyStrings, 'empty strings');
    });

    test('rejects boolean values for critical Factors', function() {
        var input = testutils.loadValidHzr();
        input.criticalFactors.slabAvalanches = false;
        testutils.assertNotValid(input, 'yes/no critial factors');
    });

    test('rejects extra string values for critical Factors', function() {
        var input = testutils.loadValidHzr();
        input.criticalFactors.slabAvalanches = 'not sure';
        testutils.assertNotValid(input, 'yes/no critial factors');
    });

    test('rejects strings with only whitespace in them', function() {
        var onlyWhitespace = testutils.loadValidHzr();
        onlyWhitespace.treelineTerrainAvoidance.terrainAvoidanceComments =
            '    \t \t';
        testutils.assertNotValid(onlyWhitespace, 'whitespace only strings');
    });

    test('accepts strings that have *no* whitespace', function() {
        var onlyWhitespace = testutils.loadValidHzr();
        onlyWhitespace.treelineTerrainAvoidance.terrainAvoidanceComments =
            'nobodyactuallywriteslikethisthoughdothey?';
        testutils.assertValid(onlyWhitespace, 'whitespace only strings');
    });
});
