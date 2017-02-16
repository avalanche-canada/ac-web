import t, {GeoPosition, DateTime, FileList} from 'services/tcomb-form'
import {QUICK, WEATHER, SNOWPACK, AVALANCHE, INCIDENT} from 'constants/min'

function range(min, max) {
    return t.refinement(t.Number, rate => rate >= min && rate <= max)
}

const YesNo = t.enums.of(['Yes', 'No'])
const Direction = t.enums.of(['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'])
const Aspect = t.struct({
    N: t.Boolean,
    NE: t.Boolean,
    E: t.Boolean,
    SE: t.Boolean,
    S: t.Boolean,
    SW: t.Boolean,
    W: t.Boolean,
    NW: t.Boolean,
})

YesNo.getTcombFormFactory = options => t.form.Radio
Direction.getTcombFormFactory = options => t.form.Radio

export const RequiredInformation = t.struct({
    title: t.String,
    datetime: DateTime,
    latlng: GeoPosition,
})

export const UploadSet = t.struct({
    files: t.maybe(FileList)
})

export const QuickReport = t.struct({
    ridingConditions: t.maybe(t.struct({
        ridingQuality: t.maybe(t.enums.of(['Amazing', 'Good', 'OK', 'Terrible'])),
        snowConditions: t.maybe(t.struct({
            'Deep powder': t.Boolean,
            Wet: t.Boolean,
            Crusty: t.Boolean,
            Powder: t.Boolean,
            Heavy: t.Boolean,
            'Wind affected': t.Boolean,
            Hard: t.Boolean,
        })),
        rideType: t.maybe(t.struct({
            'Mellow slopes': t.Boolean,
            'Convex slopes': t.Boolean,
            'Alpine slopes': t.Boolean,
            'Dense trees': t.Boolean,
            'Steep slopes': t.Boolean,
            'Open trees': t.Boolean,
            'Cut-blocks': t.Boolean,
            'Sunny slopes': t.Boolean,
        })),
        stayedAway: t.maybe(t.struct({
            'Convex slopes': t.Boolean,
            'Alpine slopes': t.Boolean,
            'Cut-blocks': t.Boolean,
            'Sunny slopes': t.Boolean,
            'Steep slopes': t.Boolean,
            'Open trees': t.Boolean,
        })),
        weather: t.maybe(t.struct({
            Warm: t.Boolean,
            Foggy: t.Boolean,
            Cloudy: t.Boolean,
            Stormy: t.Boolean,
            Windy: t.Boolean,
            Cold: t.Boolean,
            Wet: t.Boolean,
            Sunny: t.Boolean,
        })),
    })),
    avalancheConditions: t.maybe(t.struct({
        snow: t.Boolean,
        slab: t.Boolean,
        sound: t.Boolean,
        temp: t.Boolean,
    })),
    comment: t.maybe(t.String),
})

export const AvalancheReport = t.struct({
    avalancheOccurrence: DateTime,
    avalancheObservation: t.maybe(t.enums.of(['12 hrs ago', '12-24 hrs ago', '>24-48 hrs ago', '>48 hrs ago'])),
    avalancheNumber: t.maybe(t.enums.of(['1', '2-5', '6-10', '11-50', '51-100'])),
    avalancheSize: t.maybe(t.enums.of(['1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5'])),
    slabThickness: t.maybe(range(10, 500)),
    slabWidth: t.maybe(range(1, 3000)),
    runLength: t.maybe(range(1, 10000)),
    avalancheCharacter: t.maybe(t.struct({
        'Storm slab': t.Boolean,
        'Wind slab': t.Boolean,
        'Persistent slab': t.Boolean,
        'Deep persistent slab': t.Boolean,
        'Wet slab': t.Boolean,
        'Cornice only': t.Boolean,
        'Cornice with slab': t.Boolean,
        'Loose wet': t.Boolean,
        'Loose dry': t.Boolean,
    })),
    triggerType: t.maybe(t.enums.of(['Natural', 'Skier', 'Snowmobile', 'Other vehicle', 'Helicopter', 'Explosives'])),
    triggerSubtype: t.maybe(t.enums.of(['Accidental', 'Intentional', 'Remote'])),
    triggerDistance: t.maybe(range(0, 2000)),
    startZoneAspect: t.maybe(Aspect),
    startZoneElevationBand: t.maybe(t.struct({
        'Alpine': t.Boolean,
        'Treeline': t.Boolean,
        'Below treeline': t.Boolean,
    })),
    startZoneElevation: t.maybe(range(0, 5000)),
    startZoneIncline: t.maybe(range(0, 90)),
    runoutZoneElevation: t.maybe(range(0, 5000)),
    weakLayerBurialDate: t.maybe(t.Date),
    weakLayerCrystalType: t.maybe(t.struct({
        'Surface hoar': t.Boolean,
        'Facets': t.Boolean,
        'Surface hoar and facets': t.Boolean,
        'Depth hoar': t.Boolean,
        'Storm snow': t.Boolean,
    })),
    crustNearWeakLayer: t.maybe(YesNo),
    windExposure: t.maybe(t.enums.of(['Lee slope', 'Cross-loaded slope', 'Windward slope', 'Down flow', 'Reverse-loaded slope', 'No wind exposure'])),
    vegetationCover: t.maybe(t.enums.of(['Open slope', 'Sparse trees or gladed slope', 'Dense trees'])),
    avalancheObsComment: t.maybe(t.String),
})

export const SnowpackReport = t.struct({
    // snowpackObsType: t.maybe(t.enums.of(['Point observation', 'Summary'])),
    // snowpackSiteElevation: t.maybe(range(0, 4000)),
    // snowpackSiteElevationBand: t.maybe(t.struct({
    //     'Alpine': t.Boolean,
    //     'Treeline': t.Boolean,
    //     'Below treeline': t.Boolean,
    // })),
    // snowpackSiteAspect: t.maybe(Aspect),
    // snowpackDepth: t.maybe(range(0, 10000)),
    // snowpackWhumpfingObserved: t.maybe(YesNo),
    // snowpackCrackingObserved: t.maybe(YesNo),
    // snowpackSurfaceCondition: t.maybe(t.struct({
    //     'New snow': t.Boolean,
    //     'Crust': t.Boolean,
    //     'Surface hoar': t.Boolean,
    //     'Facets': t.Boolean,
    //     'Corn': t.Boolean,
    //     'Variable': t.Boolean,
    // })),
    // snowpackFootPenetration: t.maybe(range(0, 200)),
    // snowpackSkiPenetration: t.maybe(range(0, 200)),
    // snowpackSledPenetration: t.maybe(range(0, 200)),
    // snowpackTestInitiation: t.maybe(t.enums.of(['None', 'Very easy', 'Easy', 'Moderate', 'Hard'])),
    // snowpackTestFracture: t.maybe(t.enums.of(['Sudden ("pop" or "drop")', 'Resistant', 'Uneven break'])),
    // snowpackTestFailure: t.maybe(range(0, 200)),
    // snowpackTestFailureLayerCrystalType: t.maybe(t.struct({
    //     'Surface hoar': t.Boolean,
    //     'Facets': t.Boolean,
    //     'Depth hoar': t.Boolean,
    //     'Storm snow': t.Boolean,
    //     'Crust': t.Boolean,
    //     'Other': t.Boolean,
    // })),
    // snowpackObsComment: t.maybe(t.String),
})

export const WeatherReport = t.struct({
    skyCondition: t.maybe(t.enums.of(['Clear', 'Few clouds (<2/8)', 'Scattered clouds (2/8-4/8)', 'Broken clouds (5/8-7/8)', 'Overcast (8/8)', 'Fog'])),
    precipitationType: t.maybe(t.enums.of(['Snow', 'Rain', 'Mixed snow & rain', 'None'])),
    snowfallRate: t.maybe(range(1, 20)),
    rainfallRate: t.maybe(t.enums.of(['Drizzle', 'Showers', 'Raining', 'Pouring'])),
    temperature: t.maybe(range(-50, 40)),
    minTemp: t.maybe(range(-50, 30)),
    maxTemp: t.maybe(range(-40, 40)),
    temperatureTrend: t.maybe(t.enums.of(['Falling', 'Steady', 'Rising'])),
    newSnow24Hours: t.maybe(range(0, 100)),
    precipitation24Hours: t.maybe(range(0, 100)),
    stormSnowAmount: t.maybe(range(0, 300)),
    stormStartDate: t.maybe(t.Date),
    windSpeed: t.maybe(t.enums.of(['Calm', 'Light (1-25 km/h)', 'Moderate (26-40 km/h)', 'Strong (41-60 km/h)', 'Extreme (>60 km/h)'])),
    windDirection: t.maybe(Direction),
    blowingSnow: t.maybe(t.enums.of(['None', 'Light', 'Moderate', 'Intense'])),
    weatherObsComment: t.maybe(t.maybe(t.String)),
})

export const IncidentReport = t.struct({
    groupActivity: t.maybe(t.enums.of(['Snowmobiling', 'Skiing', 'Climbing/Mountaineering', 'Hiking/Scrambling', 'Snowshoeing', 'Tobogganing', 'Other'])),
    otherActivityDescription: t.maybe(t.String),
    groupDetails: t.maybe(t.struct({
        groupSize: t.maybe(range(1, 100)),
        numberFullyBuried: t.maybe(range(1, 100)),
        numberPartlyBuriedImpairedBreathing: t.maybe(range(0, 100)),
        numberPartlyBuriedAbleBreathing: t.maybe(range(0, 100)),
        numberCaughtOnly: t.maybe(range(0, 100)),
        numberPeopleInjured: t.maybe(range(0, 400)),
    })),
    terrainShapeTriggerPoint: t.maybe(t.enums.of(['Convex', 'Planar', 'Concave', 'Unsupported'])),
    snowDepthTriggerPoint: t.maybe(t.enums.of(['Shallow', 'Deep', 'Average', 'Variable'])),
    terrainTrap: t.maybe(t.struct({
        'No obvious terrain trap': t.Boolean,
        'Gully or depression': t.Boolean,
        'Slope transition or bench': t.Boolean,
        Trees: t.Boolean,
        Cliff: t.Boolean,
    })),
    incidentDescription: t.maybe(t.String),
    numberInvolved: t.maybe(t.Number),
})

export const ObservationSet = t.refinement(t.struct({
    [QUICK]: t.maybe(QuickReport),
    [AVALANCHE]: t.maybe(AvalancheReport),
    [SNOWPACK]: t.maybe(SnowpackReport),
    [WEATHER]: t.maybe(WeatherReport),
    [INCIDENT]: t.maybe(IncidentReport),
}), observations => {
    console.warn(observations)
    const keys = Object.keys(observations)

    return keys.length > 0 && keys.every(key => !t.Nil.is(observations[key]))
})

export const Submission = t.struct({
    required: RequiredInformation,
    observations: ObservationSet,
    uploads: UploadSet,
})
