
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

describe('transforming offseason', function(){
    var spring = {
       "id" : "cf93f4a2-6c5c-40b8-9bb3-a9728f697585",
       "version" : 1,
       "data" : {
          "id" : "cf93f4a2-6c5c-40b8-9bb3-a9728f697585",
          "forecaster" : "Will Harding",
          "comment" : {
             "blocks" : [
                {
                   "entityRanges" : [],
                   "data" : {},
                   "text" : "Spring mode off season message text",
                   "type" : "unstyled",
                   "depth" : 0,
                   "key" : "3hn1a",
                   "inlineStyleRanges" : []
                }
             ],
             "entityMap" : {}
          },
          "weatherSummary" : {
             "entityMap" : {},
             "blocks" : [
                {
                   "text" : "spring mode weather",
                   "data" : {},
                   "entityRanges" : [],
                   "inlineStyleRanges" : [],
                   "key" : "4oj70",
                   "depth" : 0,
                   "type" : "unstyled"
                }
             ]
          },
          "headline" : {
             "value" : "spring",
             "display" : "Spring"
          },
          "season" : {
             "value" : "spring",
             "display" : "Spring"
          },
          "offSeasonMessage" : "The avalanche danger is variable and can range from Low to High. Travelling early in the day is recommended, as conditions can change rapidly in short periods of time due to daytime warming. Pay careful attention to the integrity of the surface crusts formed overnight and rising air temperatures during the day. Dry slab avalanche danger may also exist during spring snow storms. Field Observations for your area may be available at the Association of Canadian Mountain Guides (ACMG) Mountain Conditions Report Website: http://www.mountainconditions.com. More Spring Conditions Details - http://www.avalanche.ca/pages/static-page/spring-conditions",
          "dateIssued" : "2019-10-25T00:00:00Z"
       },
       "productType" : "offseason",
       "areaId" : "f7b66dc7-a172-4ef1-8cc5-2ae65bb5446f"
    };
    var fall   = {
       "data" : {
          "weatherSummary" : {
             "entityMap" : {},
             "blocks" : [
                {
                   "data" : {},
                   "inlineStyleRanges" : [],
                   "text" : "North Col weather summary",
                   "key" : "d9so5",
                   "type" : "unstyled",
                   "entityRanges" : [],
                   "depth" : 0
                }
             ]
          },
          "forecaster" : "Will Harding",
          "dateIssued" : "2019-10-24T00:00:00Z",
          "comment" : {
             "entityMap" : {},
             "blocks" : [
                {
                   "data" : {},
                   "text" : "It is fall for sure",
                   "inlineStyleRanges" : [],
                   "key" : "9iap3",
                   "type" : "unstyled",
                   "depth" : 0,
                   "entityRanges" : []
                }
             ]
          },
          "offSeasonMessage" : "Insufficient observations exist to reliably rate the avalanche danger. Expect shallow snow cover with thinly buried rocks and trees just beneath the surface. Avalanche danger often concentrates in gullies and other deposition areas, where windslabs may bond poorly to a weak underlying base. Deeper snow usually exists at higher elevations. Field Observations for your area may be available at the Association of Canadian Mountain Guides (ACMG) Mountain Conditions Report Website: http://www.mountainconditions.com. More Early Season Details - http://www.avalanche.ca/early-season-conditions",
          "id" : "3d52e60c-a7ac-40ea-8748-9bf0a14fb8dc",
          "season" : {
             "display" : "Fall",
             "value" : "fall"
          },
          "headline" : {
             "display" : "Fall",
             "value" : "fall"
          }
       },
       "version" : 1,
       "productType" : "offseason",
       "areaId" : "55957097-12a1-4783-abb9-776a4d8040e9",
       "id" : "3d52e60c-a7ac-40ea-8748-9bf0a14fb8dc"
    };
    var summer = {
	   "data" : {
		  "forecaster" : "Will Harding",
		  "season" : {
			 "value" : "summer",
			 "display" : "Summer"
		  },
		  "weatherSummary" : {
			 "blocks" : [
				{
				   "data" : {},
				   "inlineStyleRanges" : [],
				   "key" : "3vo4j",
				   "type" : "unstyled",
				   "entityRanges" : [],
				   "text" : "Summer weather fx",
				   "depth" : 0
				}
			 ],
			 "entityMap" : {}
		  },
		  "offSeasonMessage" : "Avalanche forecasts have ended for the season and will return with the snow in the fall. Look for the first one sometime in November. Field Observations for your area may be available at the Association of Canadian Mountain Guides (ACMG) Mountain Conditions Report Website: http://www.mountainconditions.com. More detailed information on managing conditions in the spring and summer: http://www.avalanche.ca/pages/static-page/spring-conditions.",
		  "id" : "55fe3052-9c10-4566-99ec-546f221362ea",
		  "headline" : {
			 "value" : "summer",
			 "display" : "Summer"
		  },
		  "dateIssued" : "2019-10-29T00:00:00Z",
		  "comment" : {
			 "blocks" : [
				{
				   "depth" : 0,
				   "entityRanges" : [],
				   "text" : "The summer message below the Icon",
				   "type" : "unstyled",
				   "data" : {},
				   "key" : "c2nd4",
				   "inlineStyleRanges" : []
				}
			 ],
			 "entityMap" : {}
		  }
	   },
	   "productType" : "offseason",
	   "id" : "55fe3052-9c10-4566-99ec-546f221362ea",
	   "areaId" : "f16bfa3d-4bda-4ad9-ac6e-bee545fe615d",
	   "version" : 1
	};

    test('spring', function(){
        var api = avid.transformOffseason('south-columbia', 'South Columbia', spring);
        expect(api.dangerMode).toEqual('Spring situation');
        expect(api.fxType).toEqual('avid');
        expect(api.id).toEqual("cf93f4a2-6c5c-40b8-9bb3-a9728f697585");
        expect(api.region).toEqual('south-columbia');
        expect(api.forecaster).toEqual("Will Harding");
        expect(api.dangerRatings.length).toEqual(3);
        expect(api.bulletinTitle).toMatch(/ - South Columbia/)
        //console.dir(api);
    });
    test('fall', function(){
        var api = avid.transformOffseason('north-columbia', 'North Columbia', fall);
        expect(api.dangerMode).toEqual('Early season');
        expect(api.fxType).toEqual('avid');
        expect(api.id).toEqual("3d52e60c-a7ac-40ea-8748-9bf0a14fb8dc");
        expect(api.region).toEqual('north-columbia');
        expect(api.forecaster).toEqual("Will Harding");
        expect(api.dangerRatings.length).toEqual(3);
        expect(api.bulletinTitle).toMatch(/ - North Columbia/)
        //console.dir(api);
    });
    test('summer', function(){
        var api = avid.transformOffseason('purcells', 'Purcells', summer);
        expect(api.dangerMode).toEqual('Off season');
        expect(api.fxType).toEqual('avid');
        expect(api.id).toEqual("55fe3052-9c10-4566-99ec-546f221362ea");
        expect(api.region).toEqual('purcells');
        expect(api.forecaster).toEqual("Will Harding");
        expect(api.dangerRatings.length).toEqual(3);
        expect(api.bulletinTitle).toMatch(/ - Purcells/)
        //console.dir(api);
    });
});

describe('transforming regular season', function(){
    var avid_fx = {
       "data" : {
          "reportId" : "e28fa609-a6a0-4190-9dee-6887709489c8",
          "validUntil" : "2019-10-30T00:00:00Z",
          "confidence" : {
             "rating" : {
                "display" : "Moderate",
                "value" : "moderate"
             },
             "statements" : [
                "Uncertainty is due to the timing of the incoming weather system."
             ]
          },
          "snowpackSummary" : {
             "entityMap" : {},
             "blocks" : [
                {
                   "entityRanges" : [],
                   "type" : "unstyled",
                   "inlineStyleRanges" : [],
                   "depth" : 0,
                   "key" : "auoub",
                   "text" : "Snowpack summary",
                   "data" : {}
                }
             ]
          },
          "highlights" : {
             "blocks" : [
                {
                   "data" : {},
                   "inlineStyleRanges" : [],
                   "text" : "This is the communications part of the thing",
                   "depth" : 0,
                   "key" : "3d2d3",
                   "type" : "unstyled",
                   "entityRanges" : []
                }
             ],
             "entityMap" : {}
          },
          "avalancheSummary" : {
             "blocks" : [
                {
                   "entityRanges" : [],
                   "type" : "unstyled",
                   "inlineStyleRanges" : [],
                   "key" : "7fqvj",
                   "depth" : 0,
                   "text" : "Avalanche Summary",
                   "data" : {}
                }
             ],
             "entityMap" : {}
          },
          "region" : "Cariboos",
          "dangerRatings" : [
             {
                "dangerRating" : {
                   "tln" : {
                      "display" : "Considerable",
                      "value" : "considerable"
                   },
                   "btl" : {
                      "value" : "considerable",
                      "display" : "Considerable"
                   },
                   "alp" : {
                      "value" : "high",
                      "display" : "High"
                   }
                },
                "date" : "2019-10-30T00:00:00Z"
             },
             {
                "date" : "2019-11-01T00:00:00Z",
                "dangerRating" : {
                   "tln" : {
                      "value" : "moderate",
                      "display" : "Moderate"
                   },
                   "btl" : {
                      "display" : "Moderate",
                      "value" : "moderate"
                   },
                   "alp" : {
                      "display" : "Considerable",
                      "value" : "considerable"
                   }
                }
             },
             {
                "dangerRating" : {
                   "btl" : {
                      "value" : "moderate",
                      "display" : "Moderate"
                   },
                   "alp" : {
                      "display" : "Considerable",
                      "value" : "considerable"
                   },
                   "tln" : {
                      "display" : "Moderate",
                      "value" : "moderate"
                   }
                },
                "date" : "2019-10-31T00:00:00Z"
             }
          ],
          "weatherForecast" : {
             "blocks" : [
                {
                   "data" : {},
                   "depth" : 0,
                   "key" : "91ltr",
                   "text" : "Weather summary",
                   "inlineStyleRanges" : [],
                   "type" : "unstyled",
                   "entityRanges" : []
                }
             ],
             "entityMap" : {}
          },
          "terrainAndTravelAdvice" : [
             "Remain vigilant for changing conditions."
          ],
          "problems" : [
             {
                "type" : "Storm Slab",
                "aspects" : [
                   {
                      "display" : "North",
                      "value" : "n"
                   },
                   {
                      "display" : "Northeast",
                      "value" : "ne"
                   },
                   {
                      "value" : "e",
                      "display" : "East"
                   },
                   {
                      "display" : "Southeast",
                      "value" : "se"
                   },
                   {
                      "display" : "South",
                      "value" : "s"
                   },
                   {
                      "display" : "Southwest",
                      "value" : "sw"
                   },
                   {
                      "value" : "w",
                      "display" : "West"
                   },
                   {
                      "value" : "nw",
                      "display" : "Northwest"
                   }
                ],
                "expectedSize" : {
                   "max" : "3",
                   "min" : "2"
                },
                "comment" : {
                   "blocks" : [
                      {
                         "data" : {},
                         "key" : "3rh49",
                         "depth" : 0,
                         "text" : "Avalanche Problem comment",
                         "inlineStyleRanges" : [],
                         "type" : "unstyled",
                         "entityRanges" : []
                      }
                   ],
                   "entityMap" : {}
                },
                "elevations" : [
                   {
                      "display" : "Alpine",
                      "value" : "alp"
                   }
                ],
                "likelihood" : {
                   "display" : "Possible-Likely",
                   "value" : "likely_possible"
                }
             }
          ],
          "dateIssued" : "2019-10-29T00:00:00Z",
          "forecaster" : "Will Harding",
          "bulletinTitle" : "Cariboos"
       },
       "id" : "e28fa609-a6a0-4190-9dee-6887709489c8",
       "areaId" : "385a4d71-4792-4d67-9539-6bd9ef2e583d",
       "version" : 3,
       "productType" : "forecast"
    };

    test('forecast', function(){
        var api = avid.transformForecast('cariboos', 'Cariboos', avid_fx);
        expect(api.dangerMode).toEqual('Regular season');
        expect(api.fxType).toEqual('avid');
        expect(api.id).toEqual("e28fa609-a6a0-4190-9dee-6887709489c8");
        expect(api.region).toEqual('cariboos');
        expect(api.forecaster).toEqual("Will Harding");
        expect(api.dangerRatings.length).toEqual(3);
        expect(api.bulletinTitle).toMatch(/ - Cariboos/)
        expect(api.dateIssued).toEqual(avid_fx.data.dateIssued);
        expect(api.validUntil).toEqual(avid_fx.data.validUntil);
    });
});
