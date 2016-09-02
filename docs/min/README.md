

# MIN api documentation

Below is an example of a full POST to the MIN submission endpoint

This post was submitted with only four un-filled form fields:

1. Avalanche > Run Length (Number)
1. Avalanche > Avalanche Character (Multi-Select)
1. Avalanche > Trigger Type (Radio)
1. Weather   > Comment (Text Field)

These are all represented by `null` value in the json object.


## Form Fields

The submission is partially handled by form fields -- for the top level meta
data -- and paritally by a JSON Document for all the details.

The top level form fields are:

| Field          | Description                                                                                                                                         |
| ---            | ---                                                                                                                                                 |
| **title**      | Title from *Step 1* box in top left of form                                                                                                         |
| **datetime**   | the submission date and time in ISO8601 format  -- please supply a timezone as well                                                                 |
| **latlng**     | the latitude and longitude of the observation location encoded as a JSON array of strings latitude before longitude. *Ex: ["48.80686","-81.29883"]* |
| **obs**        | the large json object for all observations. See section below                                                                                       |
| **tempLatlng** | Unsure. I think this is ignored                                                                                                                     |
| ** files*n* ** | Used to upload the files from the multi-image select                                                                                                |




## JSON obs data

Example MIN observation data data:


```json

{
   "weatherReport" : {
      "precipitation24Hours" : 50,
      "weatherObsComment" : null,
      "temperatureTrend" : "Rising",
      "rainfallRate" : "Drizzle",
      "newSnow24Hours" : 25,
      "stormStartDate" : "2016-09-02",
      "minTemp" : 0,
      "blowingSnow" : "Moderate",
      "windDirection" : "E",
      "skyCondition" : "Scattered clouds (2/8-4/8)",
      "snowfallRate" : 15,
      "stormSnowAmount" : 100,
      "precipitationType" : "Mixed snow & rain",
      "temperature" : -20,
      "windSpeed" : "Moderate (26-40 km/h)",
      "maxTemp" : 0
   },
   "snowpackReport" : {
      "snowpackTestInitiation" : "Moderate",
      "snowpackSkiPenetration" : 15,
      "snowpackSledPenetration" : 100,
      "snowpackSiteElevationBand" : {
         "Alpine" : true,
         "Treeline" : false,
         "Below treeline" : false
      },
      "snowpackSiteAspect" : {
         "W" : false,
         "SW" : true,
         "S" : false,
         "SE" : false,
         "NW" : true,
         "NE" : false,
         "E" : false,
         "N" : false
      },
      "snowpackTestFailureLayerCrystalType" : {
         "Facets" : false,
         "Other" : false,
         "Storm snow" : false,
         "Surface hoar" : false,
         "Depth hoar" : false,
         "Crust" : true
      },
      "snowpackTestFailure" : 15,
      "snowpackSurfaceCondition" : {
         "New snow" : true,
         "Corn" : false,
         "Crust" : false,
         "Facets" : false,
         "Surface hoar" : true,
         "Variable" : false
      },
      "snowpackTestFracture" : "Sudden (\"pop\" or \"drop\")",
      "snowpackDepth" : 200,
      "snowpackSiteElevation" : 1200,
      "snowpackFootPenetration" : 15,
      "snowpackCrackingObserved" : "No",
      "snowpackObsComment" : "Snowpack comment",
      "snowpackWhumpfingObserved" : "Yes",
      "snowpackObsType" : "Point observation"
   },
   "incidentReport" : {
      "numberPartlyBuriedImpairedBreathing" : 31,
      "numberFullyBuried" : 1,
      "snowDepthTriggerPoint" : "Variable",
      "numberPartlyBuriedAbleBreathing" : 1,
      "numberInvolved" : 35,
      "groupActivity" : {
         "Hiking/Scrambling" : true,
         "Tobogganing" : false,
         "Climbing/Mountaineering" : true,
         "Snowmobiling" : false,
         "Skiing" : false,
         "Snowshoeing" : true,
         "Other" : false
      },
      "incidentDescription" : "TEST INCIDENT COMMENT",
      "terrainShapeTriggerPoint" : "Convex",
      "numberCaughtOnly" : 1,
      "numberPeopleInjured" : 1,
      "otherActivityDescription" : "Snow Angels",
      "groupSize" : 2,
      "terrainTrap" : {
         "No obvious terrain trap" : false,
         "Gully or depression" : true,
         "Slope transition or bench" : false,
         "Cliff" : true,
         "Trees" : false
      }
   },
   "avalancheReport" : {
      "startZoneElevation" : 100,
      "weakLayerBurialDate" : "2016-09-02",
      "avalancheNumber" : "6-10",
      "avalancheCharacter" : {
         "Deep persistent slab" : false,
         "Persistent slab" : false,
         "Cornice with slab" : false,
         "Cornice only" : false,
         "Loose dry" : false,
         "Storm slab" : false,
         "Wet slab" : false,
         "Loose wet" : false,
         "Wind slab" : false
      },
      "avalancheOccurrenceEpoch" : "2016-09-02",
      "vegetationCover" : "Open slope",
      "avalancheSize" : "1",
      "avalancheObservation" : "12 hrs ago",
      "triggerType" : null,
      "triggerDistance" : 34,
      "startZoneIncline" : 80,
      "slabWidth" : 20,
      "runoutZoneElevation" : 1200,
      "slabThickness" : 20,
      "runLength" : null,
      "avalancheOccurrenceTime" : "3:48 PM",
      "crustNearWeakLayer" : "No",
      "startZoneElevationBand" : {
         "Treeline" : false,
         "Below treeline" : false,
         "Alpine" : true
      },
      "avalancheObsComment" : "Avalanche Comments",
      "startZoneAspect" : {
         "NE" : false,
         "NW" : false,
         "E" : true,
         "N" : true,
         "W" : false,
         "SW" : false,
         "SE" : false,
         "S" : false
      },
      "windExposure" : "Lee slope",
      "triggerSubtype" : "Remote",
      "weakLayerCrystalType" : {
         "Storm snow" : false,
         "Facets" : false,
         "Surface hoar" : true,
         "Surface hoar and facets" : false,
         "Depth hoar" : true
      }
   },
   "quickReport" : {
      "avalancheConditions" : {
         "snow" : false,
         "slab" : true,
         "sound" : true,
         "temp" : false
      },
      "comment" : "Comment for Quick",
      "ridingConditions" : {
         "ridingQuality" : {
            "selected" : "Amazing",
            "type" : "single",
            "prompt" : "Riding quality was:",
            "options" : [
               "Amazing",
               "Good",
               "OK",
               "Terrible"
            ]
         },
         "weather" : {
            "type" : "multiple",
            "prompt" : "The day was:",
            "options" : {
               "Warm" : true,
               "Foggy" : false,
               "Cloudy" : false,
               "Stormy" : true,
               "Windy" : false,
               "Cold" : false,
               "Wet" : false,
               "Sunny" : true
            }
         },
         "snowConditions" : {
            "options" : {
               "Deep powder" : true,
               "Wet" : false,
               "Crusty" : true,
               "Powder" : false,
               "Heavy" : false,
               "Wind affected" : false,
               "Hard" : false
            },
            "prompt" : "Snow conditions were:",
            "type" : "multiple"
         },
         "stayedAway" : {
            "prompt" : "We stayed away from:",
            "type" : "multiple",
            "options" : {
               "Convex slopes" : false,
               "Alpine slopes" : false,
               "Cut-blocks" : true,
               "Sunny slopes" : false,
               "Steep slopes" : true,
               "Open trees" : false
            }
         },
         "rideType" : {
            "type" : "multiple",
            "prompt" : "We rode:",
            "options" : {
               "Mellow slopes" : true,
               "Convex slopes" : true,
               "Alpine slopes" : false,
               "Dense trees" : false,
               "Steep slopes" : false,
               "Open trees" : false,
               "Cut-blocks" : false,
               "Sunny slopes" : false
            }
         }
      }
   }
}


```

