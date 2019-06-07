//TODO: finish me
var request = require('request');
var fs      = require('fs');

var common = require('./MIN_common')

var multi_post = {
   "weatherReport" : {
      "precipitationType" : "Rain",
      "newSnow24Hours" : null,
      "maxTemp" : null,
      "weatherObsComment" : "NOT A REAL WEATHER OBSERVATION",
      "windSpeed" : "Strong (41-60 km/h)",
      "blowingSnow" : null,
      "precipitation24Hours" : 50,
      "temperature" : null,
      "skyCondition" : "Clear",
      "stormSnowAmount" : null,
      "stormStartDate" : null,
      "snowfallRate" : 2,
      "temperatureTrend" : "Steady",
      "minTemp" : null,
      "rainfallRate" : "Pouring",
      "windDirection" : "SW"
   },
   "avalancheReport" : {
      "startZoneElevation" : null,
      "slabWidth" : null,
      "avalancheObsComment" : "THIS IS NOT A REAL AVALANCHE REPORT",
      "crustNearWeakLayer" : null,
      "avalancheObservation" : ">48 hrs ago",
      "avalancheNumber" : "11-50",
      "windExposure" : null,
      "startZoneAspect" : {
         "NW" : true,
         "S" : false,
         "NE" : false,
         "E" : false,
         "SE" : false,
         "N" : false,
         "W" : true,
         "SW" : true
      },
      "runoutZoneElevation" : null,
      "avalancheOccurrenceTime" : "11:00 AM",
      "runLength" : null,
      "avalancheCharacter" : {
         "Loose wet" : false,
         "Deep persistent slab" : false,
         "Persistent slab" : true,
         "Storm slab" : false,
         "Loose dry" : true,
         "Wind slab" : false,
         "Cornice with slab" : false,
         "Wet slab" : false,
         "Cornice only" : false
      },
      "weakLayerBurialDate" : null,
      "avalancheSize" : null,
      "avalancheOccurrenceEpoch" : "2019-03-06",
      "triggerDistance" : null,
      "slabThickness" : 250,
      "triggerType" : "Snowmobile",
      "weakLayerCrystalType" : null,
      "startZoneElevationBand" : {
         "Alpine" : false,
         "Below treeline" : false,
         "Treeline" : true
      },
      "startZoneIncline" : null,
      "vegetationCover" : null,
      "triggerSubtype" : "Remote"
   },
   "snowpackReport" : {
      "snowpackTestFailureLayerCrystalType" : {
         "Facets" : false,
         "Other" : true,
         "Depth hoar" : false,
         "Storm snow" : true,
         "Surface hoar" : false,
         "Crust" : false
      },
      "snowpackSiteElevation" : 2100,
      "snowpackCrackingObserved" : null,
      "snowpackSiteElevationBand" : {
         "Alpine" : true,
         "Below treeline" : false,
         "Treeline" : true
      },
      "snowpackSurfaceCondition" : {
         "Facets" : true,
         "New snow" : false,
         "Corn" : true,
         "Surface hoar" : false,
         "Variable" : false,
         "Crust" : false
      },
      "snowpackTestFracture" : "Uneven break",
      "snowpackTestInitiation" : "Moderate",
      "snowpackObsComment" : "NOT A REAL SNOWPACK OBSERVATION",
      "snowpackObsType" : "Point observation",
      "snowpackFootPenetration" : null,
      "snowpackSledPenetration" : null,
      "snowpackSiteAspect" : {
         "E" : true,
         "S" : false,
         "NE" : false,
         "NW" : true,
         "SW" : false,
         "W" : false,
         "N" : false,
         "SE" : false
      },
      "snowpackTestFailure" : null,
      "snowpackDepth" : 120,
      "snowpackSkiPenetration" : null,
      "snowpackWhumpfingObserved" : null
   },
   "incidentReport" : {
      "numberInvolved" : 1,
      "terrainShapeTriggerPoint" : "Planar",
      "otherActivityDescription" : null,
      "groupDetails" : {
         "numberFullyBuried" : 1,
         "groupSize" : 3,
         "numberCaughtOnly" : null,
         "numberPartlyBuriedImpairedBreathing" : null,
         "numberPartlyBuriedAbleBreathing" : null,
         "numberPeopleInjured" : null
      },
      "groupActivity" : "Climbing/Mountaineering",
      "incidentDescription" : "NOT A REAL INCIDENT",
      "terrainTrap" : {
         "Trees" : false,
         "No obvious terrain trap" : false,
         "Slope transition or bench" : true,
         "Gully or depression" : true,
         "Cliff" : false
      },
      "snowDepthTriggerPoint" : null
   },
   "quickReport" : {
      "avalancheConditions" : {
         "slab" : false,
         "sound" : false,
         "snow" : true,
         "temp" : false
      },
      "comment" : null,
      "ridingConditions" : {
         "weather" : {
            "prompt" : "The day was:",
            "type" : "multiple",
            "options" : {
               "Windy" : false,
               "Foggy" : false,
               "Warm" : false,
               "Cloudy" : true,
               "Stormy" : false,
               "Wet" : false,
               "Sunny" : false,
               "Cold" : false
            }
         },
         "ridingQuality" : {
            "options" : [
               "Amazing",
               "Good",
               "OK",
               "Terrible"
            ],
            "selected" : "Good",
            "prompt" : "Riding quality was:",
            "type" : "single"
         },
         "snowConditions" : {
            "type" : "multiple",
            "prompt" : "Snow conditions were:",
            "options" : {
               "Hard" : false,
               "Heavy" : false,
               "Wet" : false,
               "Wind affected" : true,
               "Powder" : false,
               "Crusty" : false,
               "Deep powder" : false
            }
         },
         "stayedAway" : {
            "options" : {
               "Cut-blocks" : false,
               "Sunny slopes" : false,
               "Convex slopes" : false,
               "Steep slopes" : false,
               "Open trees" : false,
               "Alpine slopes" : false
            },
            "prompt" : "We stayed away from:",
            "type" : "multiple"
         },
         "rideType" : {
            "options" : {
               "Convex slopes" : false,
               "Steep slopes" : false,
               "Open trees" : false,
               "Alpine slopes" : false,
               "Sunny slopes" : false,
               "Dense trees" : false,
               "Cut-blocks" : false,
               "Mellow slopes" : false
            },
            "type" : "multiple",
            "prompt" : "We rode:"
         }
      }
   }
};

var form = common.get_MIN_payload({
    title: "Post With no images",
    obs: JSON.stringify(multi_post),
});

var signature = common.get_jwt();
var headers = {'Authorization': 'Bearer ' + signature};
console.log('Posting form');

request.post({url:'http://localhost:9000/api/min/submissions',  formData: form, headers: headers }, function(err, resp, body) {
    if(err) {
        console.log('Error:', err.message)
        return;
    }
    console.log('Server resp: ' + resp.statusCode);
    if (resp.statusCode == 201) {
        var ret = JSON.parse(body);
        console.log('Location: http://localhost:9000/mountain-information-network/submissions/' + ret.subid);
    } else if (resp.statusCode == 500) {
        console.error(body);
    }
});
