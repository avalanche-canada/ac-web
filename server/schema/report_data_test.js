/* globals describe: true, it: true */

var assert = require('assert')
var min = require('./report_data')
var testutils= require('./testutils')

var assertMatch = (pattern, input) => {
    var r = new RegExp(pattern)
    if(!r.test(input)) {
        throw new Error('MatchError: "' + input + '" does not match /' + pattern +'/')
    }
}
var assertNotMatch = (pattern, input) => {
    var r = new RegExp(pattern)
    if(r.test(input)) {
        throw new Error('NotMatchError: "' + input + '" does match /' + pattern +'/')
    }
}

describe('schema converter', function() {
    describe('date time', function() {
        it('time pattern should match 12h', function() {
            var json = min.converters.datetime({
                type: 'datetime',
                showOnlyTime: true,
            });

            assertMatch(json.pattern,     '12:00 AM');
            assertMatch(json.pattern,     '2:00 AM');
            assertMatch(json.pattern,     '2:11 PM');
        });
        it('time pattern should only match valid 12h times', function() {
            var json = min.converters.datetime({
                type: 'datetime',
                showOnlyTime: true,
            });

            assertNotMatch(json.pattern,     '19:00 AM');
            assertNotMatch(json.pattern,     '2:00 AM XXXX');
            assertNotMatch(json.pattern,     '2:00 rM');
        });
        it('date pattern should only match valid dates', function() {
            var json = min.converters.datetime({
                type: 'datetime',
                showOnlyDate: true,
            });
            assertMatch(json.pattern, '2016-01-01');
            assertMatch(json.pattern, '0000-00-00');
        });
        it('date pattern should match only dates (no time)', function() {
            var json = min.converters.datetime({
                type: 'datetime',
                showOnlyDate: true,
            });
            assertNotMatch(json.pattern, '2016-01-01T00:00:00Z');
        });
    });

    it('disallows whitespace in strings', function() {
        var form = testutils.loadValidMin()
        form.snowpackReport.snowpackObsComment = "  \t\t  ";

        testutils.assertNotValidMin(form, "comments filled with only spaces")

    });
});
