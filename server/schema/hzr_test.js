/* globals describe: true, it: true */

var min = require('./report_data')
var assert = require('assert')

var testutils = require('./testutils')


describe('hzr schema', function() {

    it('validates the known good test object', function() {
        var valid = testutils.loadValidHzr();
        testutils.assertValid(valid, 'Known good commit')
    });

    it('rejects empty strings for text elements', function() {
        var emptyStrings = testutils.loadValidHzr();
        emptyStrings.treelineTerrainAvoidance.terrainAvoidanceComments = "";
        testutils.assertNotValid(emptyStrings, 'empty strings')
    });

    it('rejects boolean values for critical Factors', function() {
        var input = testutils.loadValidHzr();
        input.criticalFactors.slabAvalanches = false;
        testutils.assertNotValid(input, 'yes/no critial factors')
    });

    it('rejects extra string values for critical Factors', function() {
        var input = testutils.loadValidHzr();
        input.criticalFactors.slabAvalanches = "not sure";
        testutils.assertNotValid(input, 'yes/no critial factors')
    });

    it('rejects strings with only whitespace in them', function() {
        var onlyWhitespace = testutils.loadValidHzr()
        onlyWhitespace.treelineTerrainAvoidance.terrainAvoidanceComments = "    \t \t";
        testutils.assertNotValid(onlyWhitespace, 'whitespace only strings');
    });

    it('accepts strings that have *no* whitespace', function() {
        var onlyWhitespace = testutils.loadValidHzr()
        onlyWhitespace.treelineTerrainAvoidance.terrainAvoidanceComments = "nobodyactuallywriteslikethisthoughdothey?";
        testutils.assertValid(onlyWhitespace, 'whitespace only strings');
    });
});

