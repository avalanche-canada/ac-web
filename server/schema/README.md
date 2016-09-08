## Form Fields 

| Field Name | Description                                                         |
| ---        | ---                                                                 |
| headline   | Title of the report                                                 |
| dateissued | Date issued from the date picker                                    |
| datevalid  | Date valid from the date picker                                     |
| hotzoneid  | Hotzone from the radio buttons on the right side                    |
| data       | the json payload for the rest of the fields (see below for example) |
| file\<n\>  | The file upload objects from the *multi* upload                     |





## Example Object

```json
{
   "treelineTerrainAvoidance" : {
      "aspect" : {
         "N" : true,
         "S" : true,
         "NW" : true,
         "E" : true,
         "W" : true,
         "NE" : true,
         "All" : true,
         "SE" : true,
         "SW" : true
      },
      "terrainAvoidanceComments" : "Treeline Travel Advice text",
      "terrainFeatures" : {
         "Variable depth snowpack" : false,
         "Convex" : true,
         "Crossloaded slopes" : false,
         "Unsupported" : false,
         "Shallow snowpack" : false,
         "Lee slopes" : true
      }
   },
   "belowTreelineTerrainAvoidance" : {
      "terrainFeatures" : {
         "Convex" : false,
         "Cutblocks" : false,
         "Creeks" : false,
         "Unsupported" : false,
         "Lee slopes" : false,
         "Runout zones" : false
      },
      "aspect" : {
         "NE" : true,
         "W" : false,
         "NW" : false,
         "E" : false,
         "S" : false,
         "N" : false,
         "SW" : true,
         "All" : false,
         "SE" : true
      },
      "terrainAvoidanceComments" : "BTL Travel advice text"
   },
   "criticalFactors" : {
      "slabAvalanches" : null,
      "recentWindloading" : "No",
      "recentRainfall" : "No",
      "criticalFactorsComments" : "Critical Factors Comments text",
      "significantWarming" : "Yes",
      "instability" : "Yes",
      "recentSnowfall" : "No",
      "persistentAvalancheProblem" : "No"
   },
   "alpineTerrainAvoidance" : {
      "terrainFeatures" : {
         "Shallow snowpack" : false,
         "Lee slopes" : false,
         "Unsupported" : false,
         "Variable depth snowpack" : true,
         "Convex" : true,
         "Crossloaded slopes" : false
      },
      "aspect" : {
         "S" : false,
         "N" : false,
         "NW" : false,
         "E" : false,
         "W" : false,
         "NE" : true,
         "SE" : true,
         "All" : false,
         "SW" : false
      },
      "terrainAvoidanceComments" : "Alpine Travel Advice text"
   }
}

```
