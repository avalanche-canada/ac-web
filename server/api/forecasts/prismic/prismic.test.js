var assert = require('assert')
const prismic = require('./index')

describe('Prismic', function() {
    test('should parse document and transform into an AvCan data format', () => {
        var document = require('./document.json')
        var forecast = require('./forecast.json')

        // TEST needs to added!

        // assert.deepStrictEqual(forecast, prismic.parse(document))
    })
})
