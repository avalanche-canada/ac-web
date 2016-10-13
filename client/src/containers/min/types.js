import t from 'tcomb-form/lib'

function range(min, max) {
    return t.refinement(t.Number, rate => rate >= min && rate <= max)
}

const YesNo = t.enums.of(['Yes', 'No'])
const Direction = t.enums.of(['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'])

YesNo.getTcombFormFactory = options => t.form.Radio
Direction.getTcombFormFactory = options => t.form.Radio

const GeoPosition = t.struct({
    longitude: t.Number,
    latitude: t.Number,
})

export const RequiredInformation = t.struct({
    title: t.String,
    datetime: t.Date,
    latlng: GeoPosition,
})

export const Uploads = t.struct({
    files: t.form.File
})

export const QuickReport = t.struct({
    ridingConditions: t.struct({
        ridingQuality: t.enums.of(['Amazing', 'Good', 'OK', 'Terrible']),
        weather: t.struct({
            Warm: t.Boolean,
            Foggy: t.Boolean,
            Cloudy: t.Boolean,
            Stormy: t.Boolean,
            Windy: t.Boolean,
            Cold: t.Boolean,
            Wet: t.Boolean,
            Sunny: t.Boolean,
        }),
        snowConditions: t.struct({
            'Deep powder': t.Boolean,
            Wet: t.Boolean,
            Crusty: t.Boolean,
            Powder: t.Boolean,
            Heavy: t.Boolean,
            'Wind affected': t.Boolean,
            Hard: t.Boolean,
        }),
        stayedAway: t.struct({
            'Convex slopes': t.Boolean,
            'Alpine slopes': t.Boolean,
            'Cut-blocks': t.Boolean,
            'Sunny slopes': t.Boolean,
            'Steep slopes': t.Boolean,
            'Open trees': t.Boolean,
        }),
        rideType: t.struct({
            'Mellow slopes': t.Boolean,
            'Convex slopes': t.Boolean,
            'Alpine slopes': t.Boolean,
            'Dense trees': t.Boolean,
            'Steep slopes': t.Boolean,
            'Open trees': t.Boolean,
            'Cut-blocks': t.Boolean,
            'Sunny slopes': t.Boolean,
        }),
    }),
    avalancheConditions: t.struct({
        snow : t.Boolean,
        slab : t.Boolean,
        sound : t.Boolean,
        temp : t.Boolean,
    }),
    comment: t.String,
})

export const AvalancheReport = t.struct({
    avalancheOccurrenceEpoch: t.Date, // pattern '^\d\d\d\d-\d\d-\d\d$'
    avalancheOccurrenceTime: t.Date, // pattern '^(1|2|3|4|5|6|7|8|9|10|11|12):[0-5][0-9] (AM|PM)$'
    avalancheObservation: t.enums.of(['12 hrs ago', '12-24 hrs ago', '>24-48 hrs ago', '>48 hrs ago']),
    avalancheNumber: t.enums.of(['1', '2-5', '6-10', '11-50', '51-100']),
    avalancheSize: t.enums.of(['1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5']),
    slabThickness: range(10, 500),
    slabWidth: range(1, 3000),
    runLength: range(1, 10000),
    avalancheCharacter: t.struct({
        'Storm slab': t.Boolean,
        'Wind slab': t.Boolean,
        'Persistent slab': t.Boolean,
        'Deep persistent slab': t.Boolean,
        'Wet slab': t.Boolean,
        'Cornice only': t.Boolean,
        'Cornice with slab': t.Boolean,
        'Loose wet': t.Boolean,
        'Loose dry': t.Boolean,
    }),
    triggerType: t.enums.of(['Natural', 'Skier', 'Snowmobile', 'Other vehicle', 'Helicopter', 'Explosives']),
    triggerSubtype: t.enums.of(['Accidental', 'Intentional', 'Remote']),
    triggerDistance: range(0, 2000),
    startZoneAspect: t.struct({
        N: t.Boolean,
        NE: t.Boolean,
        E: t.Boolean,
        SE: t.Boolean,
        S: t.Boolean,
        SW: t.Boolean,
        W: t.Boolean,
        NW: t.Boolean,
    }),
    startZoneElevationBand: t.struct({
        'Alpine': t.Boolean,
        'Treeline': t.Boolean,
        'Below treeline': t.Boolean,
    }),
    startZoneElevation: range(0, 5000),
    startZoneIncline: range(0, 90),
    runoutZoneElevation: range(0, 5000),
    weakLayerBurialDate: t.Date, // pattern '^\d\d\d\d-\d\d-\d\d$'
    weakLayerCrystalType: t.struct({
        'Surface hoar': t.Boolean,
        'Facets': t.Boolean,
        'Surface hoar and facets': t.Boolean,
        'Depth hoar': t.Boolean,
        'Storm snow': t.Boolean,
    }),
    crustNearWeakLayer: YesNo,
    windExposure: t.enums.of(['Lee slope', 'Cross-loaded slope', 'Windward slope', 'Down flow', 'Reverse-loaded slope', 'No wind exposure']),
    vegetationCover: t.enums.of(['Open slope', 'Sparse trees or gladed slope', 'Dense trees']),
    avalancheObsComment: t.maybe(t.String),
})


export const SnowpackReport = t.struct({
    snowpackObsType: t.enums.of(['Point observation', 'Summary']),
    snowpackSiteElevation: range(0, 4000),
    snowpackSiteElevationBand: t.struct({
        'Alpine': t.Boolean,
        'Treeline': t.Boolean,
        'Below treeline': t.Boolean,
    }),
    snowpackSiteAspect: t.struct({
        N: t.Boolean,
        NE: t.Boolean,
        E: t.Boolean,
        SE: t.Boolean,
        S: t.Boolean,
        SW: t.Boolean,
        W: t.Boolean,
        NW: t.Boolean
    }),
    snowpackDepth: range(0, 10000),
    snowpackWhumpfingObserved: YesNo,
    snowpackCrackingObserved: YesNo,
    snowpackSurfaceCondition: t.struct({
        'New snow': t.Boolean,
        'Crust': t.Boolean,
        'Surface hoar': t.Boolean,
        'Facets': t.Boolean,
        'Corn': t.Boolean,
        'Variable': t.Boolean,
    }),
    snowpackFootPenetration: range(0, 200),
    snowpackSkiPenetration: range(0, 200),
    snowpackSledPenetration: range(0, 200),
    snowpackTestInitiation: t.enums.of(['None', 'Very easy', 'Easy', 'Moderate', 'Hard']),
    snowpackTestFracture: t.enums.of(['Sudden ("pop" or "drop")', 'Resistant', 'Uneven break']),
    snowpackTestFailure: range(0, 200),
    snowpackTestFailureLayerCrystalType: t.struct({
        'Surface hoar': t.Boolean,
        'Facets': t.Boolean,
        'Depth hoar': t.Boolean,
        'Storm snow': t.Boolean,
        'Crust': t.Boolean,
        'Other': t.Boolean,
    }),
    snowpackObsComment: t.maybe(t.String),
})

export const WeatherReport = t.struct({
    precipitation24Hours : range(0, 100),
    temperatureTrend : t.enums.of(['Falling', 'Steady', 'Rising']),
    rainfallRate : t.enums.of(['Drizzle', 'Showers', 'Raining', 'Pouring']),
    newSnow24Hours : range(0, 100),
    stormStartDate : t.Date,  // pattern: '^\d\d\d\d-\d\d-\d\d'
    minTemp : range(-50, 30),
    blowingSnow : t.enums.of(['None', 'Light', 'Moderate', 'Intense']),
    windDirection : Direction,
    skyCondition : t.enums.of(['Clear', 'Few clouds (<2/8)', 'Scattered clouds (2/8-4/8)', 'Broken clouds (5/8-7/8)', 'Overcast (8/8)', 'Fog']),
    snowfallRate : range(1, 20),
    stormSnowAmount : range(0, 300),
    precipitationType : t.enums.of(['Snow', 'Rain', 'Mixed snow & rain', 'None']),
    temperature : range(-50, 40),
    windSpeed : t.enums.of(['Calm', 'Light (1-25 km/h)', 'Moderate (26-40 km/h)', 'Strong (41-60 km/h)', 'Extreme (>60 km/h)']),
    maxTemp : range(-40, 40),
    weatherObsComment : t.maybe(t.String),
})

export const IncidentReport = t.struct({
    groupActivity: t.enums.of(['Snowmobiling', 'Skiing', 'Climbing/Mountaineering', 'Hiking/Scrambling', 'Snowshoeing', 'Tobogganing', 'Other']),
    otherActivityDescription: t.maybe(t.String),
    numberInvolved: t.Number,
    groupDetails: t.struct({
        groupSize: range(1, 100),
        numberFullyBuried: range(1, 100),
        numberPartlyBuriedImpairedBreathing: range(0, 100),
        numberPartlyBuriedAbleBreathing: range(0, 100),
        numberCaughtOnly: range(0, 100),
        numberPeopleInjured: range(0, 400),
    }),
    terrainShapeTriggerPoint: t.enums.of(['Convex', 'Planar', 'Concave', 'Unsupported']),
    snowDepthTriggerPoint: t.enums.of(['Shallow', 'Deep', 'Average', 'Variable']),
    terrainTrap: t.struct({
        'No obvious terrain trap': t.Boolean,
        'Gully or depression': t.Boolean,
        'Slope transition or bench': t.Boolean,
        Trees: t.Boolean,
        Cliff: t.Boolean,
    }),
    incidentDescription: t.maybe(t.String),
})

export default t.struct({
    requiredInformation: RequiredInformation,
    uploads: Uploads,
    obs: t.struct({
        quickReport: t.maybe(QuickReport),
        avalancheReport: t.maybe(AvalancheReport),
        snowpackReport: t.maybe(SnowpackReport),
        weatherReport: t.maybe(WeatherReport),
        incidentReport: t.maybe(IncidentReport),
    }),
})
