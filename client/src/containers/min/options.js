import t from 'tcomb-form/lib'
import {QUICK, WEATHER, SNOWPACK, AVALANCHE, INCIDENT} from 'components/mountainInformationNetwork/types'

const ASPECT_FIELDS = {
    N: {
        label: 'N',
    },
    NE: {
        label: 'NE',
    },
    E: {
        label: 'E',
    },
    SE: {
        label: 'SE',
    },
    S: {
        label: 'S',
    },
    SW: {
        label: 'SW',
    },
    W: {
        label: 'W',
    },
    NW: {
        label: 'NW',
    },
}

export default {
    required: {
        label: 'Step 1. Required Information',
        fields: {
            title: {
                label: 'Name',
                help: 'Name your report'
            },
            latlng: {
                label: 'Position',
            },
        },
    },
    uploads: {
        label: 'Step 2. Uploads',
        fields: {
            files: {
                factory: t.form.Textbox,
                transformer: {
                    format: value => t.Nil.is(value) ? '' : value,
                    parse: (...args) => {
                        console.warn(...args)
                    }
                },
                type: 'file',
                attrs: {
                    multiple: true,
                },
                help: 'Add a photo (.jpg or .png) to help tell your story. If uploading more than one photo, select all and submit photos together.',
            }
        },
    },
    [QUICK]: {
        help: 'Use the Quick Report to quickly share information about your trip. You can create a comprehensive report by adding more details in the Avalanche, Snowpack, Weather, and/or Incident tabs.',
        fields: {
            ridingConditions: {
                fields: {
                    ridingQuality: {
                        factory: t.form.Radio,
                    },
                }
            },
            avalancheConditions: {
                fields: {
                    slab: {
                        label: 'Slab avalanches today or yesterday.',
                    },
                    sound: {
                        label: 'Whumpfing or drum-like sounds or shooting cracks.',
                    },
                    snow: {
                        label: '30cm + of new snow, or significant drifitng, or rain in the last 48 hours.',
                    },
                    temp: {
                        label: 'Rapid temperature rise to near zero degrees or wet surface snow.',
                    }
                }
            },
            comment: {
                type: 'textarea'
            }
        }
    },
    [WEATHER]: {
        help: 'Key data includes information about current and accumulated precipitation, wind speed and direction, temperatures, and cloud cover.',
        fields: {
            temperatureTrend: {
                factory: t.form.Radio,
                label: 'Describe how the temperature changed in the last 3 hours.',
            },
            snowfallRate: {
                label: 'Snowfall rate (cm/hour)',
                help: 'If there was no snow, please leave this field blank.',
                type: 'number',
            },
            rainfallRate: {
                factory: t.form.Radio,
                help: 'If there was no rain, please leave this field blank.',
            },
            newSnow24Hours: {
                label: 'Amount of new snow in last 24 hours (cm)',
                type: 'number',
            },
            precipitation24Hours: {
                label: 'Total rain and snow combined in last 24 hours (mm)',
                type: 'number',
            },
            stormSnowAmount: {
                label: 'Total snow from the most recent storm (cm)',
                help: 'Please enter the amount of snow that has fallen during the current storm cycle. You can specify a storm start date to describe the time period over which this snow fell.',
                type: 'number',
            },
            stormStartDate: {
                help: 'The date on which the most recent storm started. Leave blank if there has not been a recent storm.',
            },
            temperature: {
                label: 'Temperature at time of observation (deg C)',
                type: 'number',
            },
            minTemp: {
                label: 'Minimum temperature in last 24 hours (deg C)',
                type: 'number',
            },
            maxTemp: {
                label: 'Maximum temperature in last 24 hours (deg C)',
                type: 'number',
            },
            windDirection: {
                fields: ASPECT_FIELDS,
            },
            blowingSnow: {
                factory: t.form.Radio,
                help: 'How much snow is blowing at ridge crest elevation. Light: localized snow drifting. Moderate: a plume of snow is visible. Intense: a large plume moving snow well down the slope.',
            },
            skyCondition: {
                factory: t.form.Radio,
                label: 'Cloud cover',
                help: 'Values expressed in eighths refer to the proportion of the sky that was covered with clouds. E.g. 2/8 refers to a sky approximately one quarter covered with cloud.',
            },
            precipitationType: {
                factory: t.form.Radio,
            },
            windSpeed: {
                factory: t.form.Radio,
                help: 'Calm: smoke rises. Light: flags and twigs move. Moderate: snow begins to drift. Strong: whole tress in motion. Extreme: difficulty walking.',
            },
            weatherObsComment: {
                type: 'textarea'
            },
        }
    },
    [SNOWPACK]: {
        help: 'Snowpack depth, layering, and bonding are key data. Test results are very useful.',
        fields: {
            snowpackObsType: {
                label: 'Is this a point observation or a summary of your day?',
                factory: t.form.Radio,
            },
            snowpackSiteElevation: {
                label: 'Elevation (m) above sea level',
                type: 'number',
            },
            snowpackSiteElevationBand: {
                label: 'Elevation band',
            },
            snowpackSiteAspect: {
                label: 'Aspect',
                fields: ASPECT_FIELDS,
            },
            snowpackDepth: {
                label: 'Snowpack depth (cm)',
                help: 'Total height of snow in centimetres. Averaged if this is a summary.',
                type: 'number',
            },
            snowpackWhumpfingObserved: {
                label: 'Did you observe whumpfing?',
                help: 'A whumpf is a rapid settlement of the snowpack caused by the collapse of a weak layer. It is accompanied by an audible noise.',
            },
            snowpackCrackingObserved: {
                label: 'Did you observe cracking?',
                help: 'Cracking is shooting cracks radiating more than a couple of metres from your sled or skis.',
            },
            snowpackSurfaceCondition: {
                label: 'Surface condition',
            },
            snowpackFootPenetration: {
                label: 'Foot penetration (cm)',
                help: 'How far you sink into the snow when standing on one fully-weighted foot',
                type: 'number',
            },
            snowpackSkiPenetration: {
                label: 'Ski penetration (cm)',
                help: 'How far you sink into the snow when standing on one fully-weighted ski.',
                type: 'number',
            },
            snowpackSledPenetration: {
                label: 'Sled penetration (cm)',
                help: 'The depth a sled sinks into the snow after stopping slowly on level terrain.',
                type: 'number',
            },
            snowpackTestInitiation: {
                factory: t.form.Radio,
                label: 'Snowpack test result',
                help: 'Average if you did a number of tests.',
            },
            snowpackTestFracture: {
                factory: t.form.Radio,
                label: 'Snowpack test fracture character',
                help: 'Average if you did a number of tests. Describe further in comments if variable results.',
            },
            snowpackTestFailure: {
                label: 'Snowpack test failure depth',
                help: 'Depth below the surface that failure occurred.',
                type: 'number',
            },
            snowpackObsComment: {
                type: 'textarea',
                label: 'Observation comment',
                help: 'Please add additional information about the snowpack, especially notes about weak layer, how the snow varied by aspect/elevation, and details of any slope testing performed.',
            }
        }
    },
    [AVALANCHE]: {
        help: 'Share information about a single, notable avalanche or tell us about overall avalanche conditions by describing many avalanches in a general sense. Aspect, elevation, trigger, dimensions/size are key data.',
        fields: {
            avalancheObservation: {
                factory: t.form.Radio,
                help: 'If you observed evidence of recent avalanches, estimate occurrence time.',
            },
            avalancheNumber: {
                factory: t.form.Radio,
                label: 'Number of avalanches in this report',
            },
            avalancheSize: {
                factory: t.form.Radio,
                help: 'Use Canadian size classification. Size 1 is relatively harmless to people. Size 2 can bury, injure or kill a person. Size 3 can bury and destroy a car. Size 4 can destroy a railway car. Size 5 can destroy 40 hectares of forest.',
            },
            slabThickness: {
                label: 'Slab thickness (cm)',
                type: 'number',
            },
            slabWidth: {
                label: 'Slab width (m)',
                type: 'number',
            },
            runLength: {
                label: 'Run length (m)',
                help: 'Length from crown to toe of debris.',
                type: 'number',
            },
            triggerType: {
                factory: t.form.Radio,
            },
            triggerSubtype: {
                factory: t.form.Radio,
                help: 'A remote trigger is when the avalanche starts some distance away from where the trigger was applied.',
            },
            triggerDistance: {
                label: 'Remote trigger distance (m)',
                help: 'If a remote trigger, enter how far from the trigger point is the nearest part of the crown.',
                type: 'number',
            },
            startZoneAspect: {
                fields: ASPECT_FIELDS
            },
            startZoneElevation: {
                label: 'Start zone elevation (m)',
                type: 'number',
            },
            startZoneIncline: {
                type: 'number',
            },
            runoutZoneElevation: {
                help: 'The lowest point of the debris.',
                type: 'number',
            },
            weakLayerBurialDate: {
                help: 'Date the weak layer was buried.'
            },
            windExposure: {
                factory: t.form.Radio,
            },
            vegetationCover: {
                factory: t.form.Radio,
            },
            avalancheObsComment: {
                type: 'textarea',
                help: 'Please add additional information, for example terrain, aspect, elevation etc. especially if describing many avalanches together.',
            }
        }
    },
    [INCIDENT]: {
        help: 'Sharing incidents can help us all learn. Describe close calls and accidents here. Be sensitive to the privacy of others. Before reporting serious accidents check our submission guidelines.',
        fields: {
            groupActivity: {
                factory: t.form.Radio,
                label: 'Activity',
                help: 'If other, please describe it below.',
            },
            groupDetails: {
                fields: {
                    groupSize: {
                        label: 'Total in the group?',
                        type: 'number',
                    },
                    numberFullyBuried: {
                        label: 'People fully buried?',
                        type: 'number',
                    },
                    numberPartlyBuriedImpairedBreathing: {
                        label: 'People partly buried with impaired breathing?',
                        type: 'number',
                    },
                    numberPartlyBuriedAbleBreathing: {
                        label: 'People partly buried with normal breathing?',
                        type: 'number',
                    },
                    numberCaughtOnly: {
                        label: 'People injured (caught but not buried)?',
                        type: 'number',
                    },
                    numberPeopleInjured: {
                        label: 'People not injured (caught but not buried)?',
                        type: 'number',
                    }
                }
            },
            numberInvolved: {
                type: 'number',
            },
            terrainTrap: {
                help: 'Terrain traps are features that increase the consequences of an avalanche.',
            },
            otherActivityDescription: {
                label: 'Other activity',
                help: 'Describe other activity',
            },
            terrainShapeTriggerPoint: {
                factory: t.form.Radio,
                label: 'Terrain shape at trigger point',
                help: 'Convex: a roll. Concave: bowl-shaped. Planar: smooth with no significant convexities or concavities. Unsupported: a slope that drops off abruptly at the bottom.',
            },
            snowDepthTriggerPoint: {
                factory: t.form.Radio,
                label: 'Snow depth at trigger point',
                help: 'The depth of the snowpack compared to the average conditions in the area. Shallow: shallower than average. Deep: deeper than average. Average: about the same as everywhere else. Variable: depth varies significantly in the place where the avalanche started.',
            },
            incidentDescription: {
                type: 'textarea',
                help: 'No names and no judging please. Submission guidelines.',
            },
        },
    },
}
