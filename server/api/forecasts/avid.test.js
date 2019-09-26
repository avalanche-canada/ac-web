
var assert = require('assert');
var avid = require('./avid');

describe('transformin danger ratings', function() {

    test('day one', function() {
        var rating = 
            { "date" : "2019-09-18T00:00:00Z",
              "dangerRating" : { 
                  "alp" : { "value" : "extreme", "display" : "Extreme" },
                  "tln" : { "display" : "No Rating", "value" : "norating" },
                  "btl" : { "value" : "moderate", "display" : "Moderate" } } };

        var api = avid.transformDangerRating(rating);
        expect(api.date).toBe("2019-09-18T00:00:00Z")
        expect(api.dangerRating.alp).toBe("5:Extreme")
        expect(api.dangerRating.tln).toBe("N/A:No Rating")
        expect(api.dangerRating.btl).toBe("2:Moderate")
    });

    test("day two", function(){
        var two = { "date" : "2019-09-20T00:00:00Z",
                   "dangerRating" : {
                      "alp" : { "display" : "No Rating", "value" : "norating" },
                      "btl" : { "display" : "No Rating", "value" : "norating" },
                      "tln" : { "display" : "No Rating", "value" : "norating" } } };

        var api = avid.transformDangerRating(two);
        expect(api.date).toBe("2019-09-20T00:00:00Z")
        expect(api.dangerRating.alp).toBe("N/A:No Rating")
        expect(api.dangerRating.tln).toBe("N/A:No Rating")
        expect(api.dangerRating.btl).toBe("N/A:No Rating")
    });

    test("day three", function(){
        var three = { "date" : "2019-09-19T00:00:00Z",
                   "dangerRating" : {
                      "tln" : { "display" : "No Rating", "value" : "norating" },
                      "alp" : { "display" : "No Rating", "value" : "norating" },
                      "btl" : { "value" : "norating", "display" : "No Rating" } }, };
        var api = avid.transformDangerRating(three);
        expect(api.date).toBe("2019-09-19T00:00:00Z")
        expect(api.dangerRating.alp).toBe("N/A:No Rating")
        expect(api.dangerRating.tln).toBe("N/A:No Rating")
        expect(api.dangerRating.btl).toBe("N/A:No Rating")
    });
});


describe('transforming problems', function() {

    test('problem 1', function(){
        var prob = {
            "expectedSize" : { "max" : "2", "min" : "1" },
            "comment" : {},
            "likelihood" : { "display" : "Unlikely-Possible", "value" : "possible_unlikely" },
            "type" : "Glide Slab",
            "elevations" : [],
            "aspects" : []
        }
        var api = avid.transformProblem(prob);
        expect(api.type).toBe("Glide Slab")
        expect(api.expectedSize.min).toBe("1.0")
        expect(api.expectedSize.max).toBe("2.0")
        expect(api.likelihood).toBe("Unlikely-Possible")
        expect(api.aspects).toEqual([])
        expect(api.elevations).toEqual([])

        expect(api.icons.elevations).toMatch(/Elevation-0-0-0_EN.png$/)
        expect(api.icons.aspects).toMatch(/compass-0-0-0-0-0-0-0-0_EN.png$/)
        expect(api.icons.likelihood).toMatch(/Likelihood-2_EN.png$/)
        expect(api.icons.expectedSize).toMatch(/Size-10-20_EN.png$/)

    });
    test('problem 2', function(){
        var prob2 = { "type": "Dry Loose",
          "elevations": [ 
            { "value": "alp", "display": "Alpine" },
            { "value": "tln", "display": "Treeline" },
            { "value": "btl", "display": "Below Treeline" }
          ],
          "aspects": [
            { "value": "s", "display": "South" },
            { "value": "se", "display": "Southeast" },
            { "value": "sw", "display": "Southwest" }
          ],
          "likelihood": {
            "value": "likely",
            "display": "Likely"
          },
          "expectedSize": {
            "min": "3",
            "max": "4.5"
          },
          "comment": {}
        };

        var api = avid.transformProblem(prob2);
        expect(api.type).toBe("Dry Loose")
        expect(api.expectedSize.min).toEqual("3.0")
        expect(api.expectedSize.max).toEqual("4.5")
        expect(api.likelihood).toBe("Likely")
        expect(api.aspects.sort()).toEqual(["S", "SE", "SW"].sort())
        expect(api.elevations.sort()).toEqual(["Alp", "Tln", "Btl"].sort())

        expect(api.icons.elevations).toMatch(/Elevation-1-1-1_EN.png$/)
        expect(api.icons.aspects).toMatch(/compass-0-0-0-1-1-1-0-0_EN.png$/)
        expect(api.icons.likelihood).toMatch(/Likelihood-5_EN.png$/)
        expect(api.icons.expectedSize).toMatch(/Size-30-45_EN.png$/)
    });

    test('problem 3', function(){
        var prob3 = {
            "type": "Dry Loose",
            "elevations": [
                { "value": "alp", "display": "Alpine" },
                { "value": "tln", "display": "Treeline" }
            ],
            "aspects": [
                { "value": "s", "display": "South" },
                { "value": "se", "display": "Southeast" },
                { "value": "sw", "display": "Southwest" },
                { "value": "e", "display": "East" },
                { "value": "w", "display": "West" },
                { "value": "n", "display": "North" },
                { "value": "ne", "display": "Northeast" },
                { "value": "nw", "display": "Northwest" }
            ],
            "likelihood": {
                "value": "certain",
                "display": "Almost Certain"
            },
            "expectedSize": {
                "min": "1",
                "max": "2.5"
            },
            "comment": {}
            } 

        var api = avid.transformProblem(prob3);
        expect(api.type).toBe("Dry Loose")
        expect(api.expectedSize.min).toEqual("1.0")
        expect(api.expectedSize.max).toEqual("2.5")
        expect(api.likelihood).toBe("Almost Certain")
        expect(api.aspects.sort()).toEqual(["S", "SE", "SW", "E", "W", "N", "NE", "NW"].sort())
        expect(api.elevations.sort()).toEqual(["Alp", "Tln"].sort())

        expect(api.icons.elevations).toMatch(/Elevation-0-1-1_EN.png$/)
        expect(api.icons.aspects).toMatch(/compass-1-1-1-1-1-1-1-1_EN.png$/)
        //TODO: Is this correct? The serialization in AvID is setting "certain" -> "Almost Certain"
        expect(api.icons.likelihood).toMatch(/Likelihood-8_EN.png$/)
        expect(api.icons.expectedSize).toMatch(/Size-10-25_EN.png$/)
    
    });
});



describe('transforming confidence', function(){
    var conf1 = {
        "rating": {
            "value": "low",
            "display": "Low"
        },
        "statements": [
            "Uncertainty is due to how buried persistent weak layers will react with the forecast incoming weather.",
            "Uncertainty is due to the fact that deep persistent slabs are particularly difficult to forecast."
        ]
    };

    var conf2 = {
       "statements" : [],
       "rating" : {
          "value" : "high",
          "display" : "High"
       }
    }

    test('conf 1 legacy', function(){
        var api = avid.transformConfidenceLegacy(conf1);
        expect(api).toEqual(
            "Low - Uncertainty is due to how buried persistent weak layers will react with the forecast incoming weather. " + 
                  "Uncertainty is due to the fact that deep persistent slabs are particularly difficult to forecast.");
    });

    test('conf 2 legacy', function(){
        var api = avid.transformConfidenceLegacy(conf2);
        expect(api).toEqual("High - ");
    });

    test('conf 1 new', function(){
        var api = avid.transformConfidence(conf1);
        expect(api.rating).toEqual("Low")
        expect(api.statements).toHaveLength(2)
            //"Low - Uncertainty is due to how buried persistent weak layers will react with the forecast incoming weather. " + 
            //      "Uncertainty is due to the fact that deep persistent slabs are particularly difficult to forecast.");
    });

    test('conf 2 new', function(){
        var api = avid.transformConfidence(conf2);
        expect(api.rating).toEqual("High");
        expect(api.statements).toHaveLength(0);
    });
});
