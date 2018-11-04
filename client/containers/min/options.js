import React, { Fragment } from 'react'
import { Link } from '@reach/router'
import t from 'vendor/tcomb-form'
import {
    QUICK,
    WEATHER,
    SNOWPACK,
    AVALANCHE,
    INCIDENT,
    NAMES,
} from 'constants/min'
import { layout, observationSet } from './templates'
import { ObservationSet } from './factories'
import format from 'date-fns/format'
import endOfToday from 'date-fns/end_of_today'
import styles from './Form.css'
import { supported } from 'utils/mapbox'

function handleNumberInputWheel(event) {
    if (document.activeElement === event.currentTarget) {
        event.preventDefault()
    }
}

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

const Required = {
    label: 'Step 1. Required Information',
    fields: {
        title: {
            label: 'Name your report',
            attrs: {
                placeholder: 'e.g. Upper Raft River',
            },
        },
        datetime: {
            type: 'datetime-local',
            label: 'When were you in the field?',
            error: 'Enter a date and time in the past',
            attrs: {
                placeholder: 'Select a date/time',
                max: format(endOfToday(), 'YYYY-MM-DDTHH:mm'),
            },
        },
        latlng: {
            label: 'Location',
            help: (
                <Fragment>
                    <p style={{ margin: 0 }}>
                        {supported()
                            ? 'Click on the map to place a pin or enter '
                            : 'Enter '}
                        a latitude and a longitude in fields below.
                    </p>
                    <p>
                        If your coordinates are expressed in Degrees, Minutes
                        and seconds (DMS), you might want to convert them to
                        degree decimals using this{' '}
                        <a
                            href="//www.latlong.net/degrees-minutes-seconds-to-decimal-degrees"
                            target="converter">
                            online converter
                        </a>
                        .
                    </p>
                </Fragment>
            ),
            className: styles.GeoPosition,
            fields: {
                longitude: {
                    error:
                        'Enter a number between -180° and 180° in degree decimals.',
                    attrs: {
                        placeholder: 'e.g. -118.18',
                    },
                },
                latitude: {
                    error:
                        'Enter a number between -90° and 90° in degree decimals.',
                    attrs: {
                        placeholder: 'e.g. 50.98',
                    },
                },
            },
        },
    },
}

const UploadSet = {
    label: 'Step 2. Uploads',
    help: 'A photo help to tell your story.',
    fields: {
        files: {
            label: 'Click to upload photos',
            help: (
                <ul>
                    <li>You can upload one or more images in one go.</li>
                    <li>
                        Click again to add more photos or the remove button to
                        remove some from your report.
                    </li>
                    <li>
                        We suggest adding one photo at a time if you want your
                        photos in a specific order.
                    </li>
                </ul>
            ),
            type: 'file',
            attrs: {
                multiple: true,
                accept: 'image/jpeg,image/jpg,image/png',
            },
        },
    },
}

const Quick = {
    label: NAMES.get(QUICK),
    help:
        'Use the Quick Report to quickly share information about your trip. You can create a comprehensive report by adding more details in the Avalanche, Snowpack, Weather, and/or Incident tabs.',
    fields: {
        ridingConditions: {
            fields: {
                ridingQuality: {
                    factory: t.form.Radio,
                    label: 'Riding quality was (optional):',
                },
                weather: {
                    label: 'The day was (optional):',
                    className: styles.TwoColumnsField,
                },
                snowConditions: {
                    label: 'Snow conditions were (optional):',
                    className: styles.TwoColumnsField,
                },
                stayedAway: {
                    label: 'We stayed away from (optional):',
                    className: styles.TwoColumnsField,
                },
                rideType: {
                    label: 'We rode (optional):',
                    className: styles.TwoColumnsField,
                },
            },
            className: styles.WihoutLegend,
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
                    label:
                        '30cm + of new snow, or significant drifting, or rain in the last 48 hours.',
                },
                temp: {
                    label:
                        'Rapid temperature rise to near zero degrees or wet surface snow.',
                },
            },
        },
        comment: {
            type: 'textarea',
        },
    },
}
const Weather = {
    label: NAMES.get(WEATHER),
    help:
        'Key data includes information about current and accumulated precipitation, wind speed and direction, temperatures, and cloud cover.',
    fields: {
        temperatureTrend: {
            factory: t.form.Radio,
            label:
                'Describe how the temperature changed in the last 3 hours. (optional)',
        },
        snowfallRate: {
            label: 'Snowfall rate (cm/hour) (optional)',
            help: 'If there was no snow, please leave this field blank.',
            error: 'Enter a number between 1 and 20',
            type: 'number',
            attrs: {
                onWheel: handleNumberInputWheel,
                placeholder: 'Number between 1 and 20',
                min: 1,
                max: 20,
            },
        },
        rainfallRate: {
            factory: t.form.Radio,
            help: 'If there was no rain, please leave this field blank.',
        },
        newSnow24Hours: {
            label: 'Amount of new snow in last 24 hours (cm) (optional)',
            error: 'Enter a number between 0 and 100',
            type: 'number',
            attrs: {
                onWheel: handleNumberInputWheel,
                placeholder: 'Number between 0 and 100',
                min: 0,
                max: 100,
            },
        },
        precipitation24Hours: {
            label:
                'Total rain and snow combined in last 24 hours (mm) (optional)',
            error: 'Enter a number between 0 and 100',
            type: 'number',
            attrs: {
                onWheel: handleNumberInputWheel,
                placeholder: 'Number between 0 and 100',
                min: 0,
                max: 100,
            },
        },
        stormSnowAmount: {
            label: 'Total snow from the most recent storm (cm) (optional)',
            help:
                'Please enter the amount of snow that has fallen during the current storm cycle. You can specify a storm start date to describe the time period over which this snow fell.',
            error: 'Enter a number between 0 and 300',
            type: 'number',
            attrs: {
                onWheel: handleNumberInputWheel,
                placeholder: 'Number between 0 and 300',
                min: 0,
                max: 300,
            },
        },
        stormStartDate: {
            type: 'date',
            help:
                'The date on which the most recent storm started. Leave blank if there has not been a recent storm.',
            attrs: {
                placeholder: 'Click to select a date',
            },
        },
        temperature: {
            label: 'Temperature at time of observation (deg C) (optional)',
            error: 'Enter a number between -50 and 40',
            type: 'number',
            attrs: {
                onWheel: handleNumberInputWheel,
                placeholder: 'Number between -50 and 40',
                min: -50,
                max: 40,
            },
        },
        minTemp: {
            label: 'Minimum temperature in last 24 hours (deg C) (optional)',
            error: 'Enter a number between -50 and 30',
            type: 'number',
            attrs: {
                onWheel: handleNumberInputWheel,
                placeholder: 'Number between -50 and 30',
                min: -50,
                max: 30,
            },
        },
        maxTemp: {
            label: 'Maximum temperature in last 24 hours (deg C) (optional)',
            error: 'Enter a number between -40 and 40',
            type: 'number',
            attrs: {
                onWheel: handleNumberInputWheel,
                placeholder: 'Number between -40 and 40',
                min: -40,
                max: 40,
            },
        },
        windDirection: {
            fields: ASPECT_FIELDS,
            config: {
                className: styles.TwoColumnsField,
            },
        },
        blowingSnow: {
            factory: t.form.Radio,
            help:
                'How much snow is blowing at ridge crest elevation. Light: localized snow drifting. Moderate: a plume of snow is visible. Intense: a large plume moving snow well down the slope.',
        },
        skyCondition: {
            factory: t.form.Radio,
            label: 'Cloud cover (optional)',
            help:
                'Values expressed in eighths refer to the proportion of the sky that was covered with clouds. E.g. 2/8 refers to a sky approximately one quarter covered with cloud.',
            config: {
                className: styles.TwoColumnsField,
            },
        },
        precipitationType: {
            factory: t.form.Radio,
        },
        windSpeed: {
            factory: t.form.Radio,
            help:
                'Calm: smoke rises. Light: flags and twigs move. Moderate: snow begins to drift. Strong: whole tress in motion. Extreme: difficulty walking.',
        },
        weatherObsComment: {
            label: 'Weather observation comment (optional)',
            type: 'textarea',
        },
    },
}
const Snowpack = {
    label: NAMES.get(SNOWPACK),
    help:
        'Snowpack depth, layering, and bonding are key data. Test results are very useful.',
    fields: {
        snowpackObsType: {
            label:
                'Is this a point observation or a summary of your day? (optional)',
            factory: t.form.Radio,
        },
        snowpackSiteElevation: {
            label: 'Elevation (m) above sea level (optional)',
            error: 'Enter a number between 0 and 4000',
            type: 'number',
            attrs: {
                onWheel: handleNumberInputWheel,
                placeholder: 'Metres above sea level',
            },
        },
        snowpackSiteElevationBand: {
            label: 'Elevation band (optional)',
        },
        snowpackSiteAspect: {
            label: 'Aspect (optional)',
            fields: ASPECT_FIELDS,
            className: styles.TwoColumnsField,
        },
        snowpackDepth: {
            label: 'Snowpack depth (cm) (optional)',
            help:
                'Total height of snow in centimetres. Averaged if this is a summary.',
            error: 'Enter a number between 0 and 10000',
            type: 'number',
            attrs: {
                onWheel: handleNumberInputWheel,
                placeholder: 'Number between 0 and 10000',
                min: 0,
                max: 10000,
            },
        },
        snowpackWhumpfingObserved: {
            label: 'Did you observe whumpfing? (optional)',
            help:
                'A whumpf is a rapid settlement of the snowpack caused by the collapse of a weak layer. It is accompanied by an audible noise.',
        },
        snowpackCrackingObserved: {
            label: 'Did you observe cracking? (optional)',
            help:
                'Cracking is shooting cracks radiating more than a couple of metres from your sled or skis.',
        },
        snowpackSurfaceCondition: {
            label: 'Surface condition (optional)',
            className: styles.TwoColumnsField,
        },
        snowpackFootPenetration: {
            label: 'Foot penetration (cm) (optional)',
            help:
                'How far you sink into the snow when standing on one fully-weighted foot',
            error: 'Enter a number between 0 and 100',
            type: 'number',
            attrs: {
                onWheel: handleNumberInputWheel,
                placeholder: 'Number between 0 and 100',
                min: 0,
                max: 100,
            },
        },
        snowpackSkiPenetration: {
            label: 'Ski penetration (cm) (optional)',
            help:
                'How far you sink into the snow when standing on one fully-weighted ski.',
            error: 'Enter a number between 0 and 200',
            type: 'number',
            attrs: {
                onWheel: handleNumberInputWheel,
                placeholder: 'Number between 0 and 200',
                min: 0,
                max: 200,
            },
        },
        snowpackSledPenetration: {
            label: 'Sled penetration (cm) (optional)',
            help:
                'The depth a sled sinks into the snow after stopping slowly on level terrain.',
            error: 'Enter a number between 0 and 200',
            type: 'number',
            attrs: {
                onWheel: handleNumberInputWheel,
                placeholder: 'Number between 0 and 200',
                min: 0,
                max: 200,
            },
        },
        snowpackTestInitiation: {
            factory: t.form.Radio,
            label: 'Snowpack test result (optional)',
            help: 'Average if you did a number of tests.',
        },
        snowpackTestFracture: {
            factory: t.form.Radio,
            label: 'Snowpack test fracture character (optional)',
            help:
                'Average if you did a number of tests. Describe further in comments if variable results.',
        },
        snowpackTestFailure: {
            label: 'Snowpack test failure depth (optional)',
            help: 'Depth below the surface that failure occurred.',
            error: 'Enter a number between 0 and 200',
            type: 'number',
            attrs: {
                onWheel: handleNumberInputWheel,
                placeholder: 'Number between 0 and 200',
                min: 0,
                max: 200,
            },
        },
        snowpackTestFailureLayerCrystalType: {
            className: styles.TwoColumnsField,
        },
        snowpackObsComment: {
            type: 'textarea',
            label: 'Observation comment (optional)',
            help:
                'Please add additional information about the snowpack, especially notes about weak layer, how the snow varied by aspect/elevation, and details of any slope testing performed.',
        },
    },
}
const Avalanche = {
    label: NAMES.get(AVALANCHE),
    help:
        'Share information about a single, notable avalanche or tell us about overall avalanche conditions by describing many avalanches in a general sense. Aspect, elevation, trigger, dimensions/size are key data.',
    fields: {
        avalancheOccurrence: {
            type: 'datetime-local',
            label: 'Avalanche date/time',
            error: 'Enter an avalanche date and time in the past',
            help: 'If you triggered or witnessed an avalanche add date/time.',
            attrs: {
                placeholder: 'Select a date/time',
                max: format(endOfToday(), 'YYYY-MM-DDTHH:mm'),
            },
        },
        avalancheObservation: {
            factory: t.form.Radio,
            help:
                'If you observed evidence of recent avalanches, estimate occurrence time.',
        },
        avalancheNumber: {
            factory: t.form.Radio,
            label: 'Number of avalanches in this report (optional)',
        },
        avalancheSize: {
            config: {
                className: styles.TwoColumnsField,
            },
            factory: t.form.Radio,
            order: 'asc',
            help: (
                <Fragment>
                    <p>Use Canadian size classification:</p>
                    <ul>
                        <li>Size 1 is relatively harmless to people.</li>
                        <li>Size 2 can bury, injure or kill a person.</li>
                        <li>Size 3 can bury and destroy a car.</li>
                        <li>Size 4 can destroy a railway car.</li>
                        <li>Size 5 can destroy 40 hectares of forest.</li>
                    </ul>
                </Fragment>
            ),
        },
        slabThickness: {
            label: 'Slab thickness (cm) (optional)',
            error: 'Enter a number between 10 and 500',
            type: 'number',
            attrs: {
                onWheel: handleNumberInputWheel,
                placeholder: 'Number between 10 and 500',
                min: 10,
                max: 500,
            },
        },
        slabWidth: {
            label: 'Slab width (m) (optional)',
            error: 'Enter a number between 1 and 3000',
            type: 'number',
            attrs: {
                onWheel: handleNumberInputWheel,
                placeholder: 'Number between 1 and 3000',
                min: 1,
                max: 3000,
            },
        },
        runLength: {
            label: 'Run length (m) (optional)',
            help: 'Length from crown to toe of debris.',
            error: 'Enter a number between 1 and 10000',
            type: 'number',
            attrs: {
                onWheel: handleNumberInputWheel,
                placeholder: 'Number between 1 and 10000',
                min: 1,
                max: 10000,
            },
        },
        avalancheCharacter: {
            className: styles.TwoColumnsField,
        },
        triggerType: {
            factory: t.form.Radio,
            config: {
                className: styles.TwoColumnsField,
            },
        },
        triggerSubtype: {
            factory: t.form.Radio,
            help:
                'A remote trigger is when the avalanche starts some distance away from where the trigger was applied.',
        },
        triggerDistance: {
            label: 'Remote trigger distance (m) (optional)',
            help:
                'If a remote trigger, enter how far from the trigger point is the nearest part of the crown.',
            error: 'Enter a number between 0 and 2000',
            type: 'number',
            attrs: {
                onWheel: handleNumberInputWheel,
                placeholder: 'Number between 0 and 2000',
                min: 0,
                max: 2000,
            },
        },
        startZoneAspect: {
            fields: ASPECT_FIELDS,
            className: styles.TwoColumnsField,
        },
        startZoneElevation: {
            label: 'Start zone elevation (m) (optional)',
            error: 'Enter a number between 0 and 5000',
            type: 'number',
            attrs: {
                onWheel: handleNumberInputWheel,
                placeholder: 'Number between 0 and 5000',
                min: 0,
                max: 5000,
            },
        },
        startZoneIncline: {
            type: 'number',
            error: 'Enter a number between 0 and 90',
            attrs: {
                onWheel: handleNumberInputWheel,
                placeholder: 'Number between 0 and 90',
                min: 0,
                max: 90,
            },
        },
        runoutZoneElevation: {
            help: 'The lowest point of the debris.',
            error: 'Enter a number between 0 and 5000',
            type: 'number',
            attrs: {
                onWheel: handleNumberInputWheel,
                placeholder: 'Metres above sea level',
            },
        },
        weakLayerBurialDate: {
            type: 'date',
            help: 'Date the weak layer was buried.',
            error: 'Enter weak layer burial date in the past',
            attrs: {
                placeholder: 'Click to select date',
                max: format(new Date(), 'YYYY-MM-DD'),
            },
        },
        weakLayerCrystalType: {
            className: styles.TwoColumnsField,
        },
        windExposure: {
            config: {
                className: styles.TwoColumnsField,
            },
            factory: t.form.Radio,
        },
        vegetationCover: {
            factory: t.form.Radio,
        },
        avalancheObsComment: {
            type: 'textarea',
            help:
                'Please add additional information, for example terrain, aspect, elevation etc. especially if describing many avalanches together.',
        },
    },
}
const Incident = {
    label: NAMES.get(INCIDENT),
    help: (
        <span>
            Sharing incidents can help us all learn. Describe close calls and
            accidents here. Be sensitive to the privacy of others. Before
            reporting serious accidents check our{' '}
            <Link
                to="/mountain-information-network/submission-guidelines"
                target="guidelines">
                submission guidelines
            </Link>
            .
        </span>
    ),
    fields: {
        groupActivity: {
            factory: t.form.Radio,
            label: 'Activity (optional)',
            help: 'If other, please describe it below.',
            config: {
                className: styles.TwoColumnsField,
            },
        },
        groupDetails: {
            label: 'Group details',
            fields: {
                groupSize: {
                    label: 'Total in the group? (optional)',
                    error: 'Enter a number between 0 and 100',
                    type: 'number',
                    attrs: {
                        onWheel: handleNumberInputWheel,
                        placeholder: 'Number between 0 and 100',
                        min: 0,
                        max: 100,
                    },
                },
                numberFullyBuried: {
                    label: 'People fully buried? (optional)',
                    error: 'Enter a number between 0 and 100',
                    type: 'number',
                    attrs: {
                        onWheel: handleNumberInputWheel,
                        placeholder: 'Number between 0 and 100',
                        min: 0,
                        max: 100,
                    },
                },
                numberPartlyBuriedImpairedBreathing: {
                    label:
                        'People partly buried with impaired breathing? (optional)',
                    error: 'Enter a number between 0 and 100',
                    type: 'number',
                    attrs: {
                        onWheel: handleNumberInputWheel,
                        placeholder: 'Number between 0 and 100',
                        min: 0,
                        max: 100,
                    },
                },
                numberPartlyBuriedAbleBreathing: {
                    label:
                        'People partly buried with normal breathing? (optional)',
                    error: 'Enter a number between 0 and 100',
                    type: 'number',
                    attrs: {
                        onWheel: handleNumberInputWheel,
                        placeholder: 'Number between 0 and 100',
                        min: 0,
                        max: 100,
                    },
                },
                numberCaughtOnly: {
                    label: 'People injured (caught but not buried)? (optional)',
                    error: 'Enter a number between 0 and 100',
                    type: 'number',
                    attrs: {
                        onWheel: handleNumberInputWheel,
                        placeholder: 'Number between 0 and 100',
                        min: 0,
                        max: 100,
                    },
                },
                numberPeopleInjured: {
                    label:
                        'People not injured (caught but not buried)? (optional)',
                    error: 'Enter a number between 0 and 400',
                    type: 'number',
                    attrs: {
                        onWheel: handleNumberInputWheel,
                        placeholder: 'Number between 0 and 400',
                        min: 0,
                        max: 400,
                    },
                },
            },
        },
        terrainTrap: {
            help:
                'Terrain traps are features that increase the consequences of an avalanche.',
        },
        otherActivityDescription: {
            attrs: {
                placeholder: 'Describe other activity',
            },
        },
        terrainShapeTriggerPoint: {
            factory: t.form.Radio,
            label: 'Terrain shape at trigger point (optional)',
            help:
                'Convex: a roll. Concave: bowl-shaped. Planar: smooth with no significant convexities or concavities. Unsupported: a slope that drops off abruptly at the bottom.',
        },
        snowDepthTriggerPoint: {
            factory: t.form.Radio,
            label: 'Snow depth at trigger point (optional)',
            help:
                'The depth of the snowpack compared to the average conditions in the area. Shallow: shallower than average. Deep: deeper than average. Average: about the same as everywhere else. Variable: depth varies significantly in the place where the avalanche started.',
        },
        incidentDescription: {
            type: 'textarea',
            help: (
                <span>
                    No names and no judging please. See{' '}
                    <Link
                        to="/mountain-information-network/submission-guidelines"
                        target="guidelines">
                        submission guidelines
                    </Link>{' '}
                    for more details.
                </span>
            ),
        },
        numberInvolved: {
            type: 'hidden',
        },
    },
}

export const Options = new Map([
    [QUICK, Quick],
    [WEATHER, Weather],
    [SNOWPACK, Snowpack],
    [AVALANCHE, Avalanche],
    [INCIDENT, Incident],
])

export default {
    template: layout,
    fields: {
        required: Required,
        uploads: UploadSet,
        observations: {
            template: observationSet,
            factory: ObservationSet,
            label: 'Step 3. Observations',
            config: {
                activeTab: 0,
                onTabActivate() {},
            },
            fields: {
                [QUICK]: Quick,
                [AVALANCHE]: Avalanche,
                [SNOWPACK]: Snowpack,
                [WEATHER]: Weather,
                [INCIDENT]: Incident,
            },
        },
    },
}
