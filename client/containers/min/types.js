import t, {
    GeoPosition,
    DateTime,
    FileList,
    createBooleanStruct,
} from 'vendor/tcomb-form'
import { QUICK, WEATHER, SNOWPACK, AVALANCHE, INCIDENT } from 'constants/min'
import isPast from 'date-fns/is_past'

function range(min, max) {
    return t.refinement(t.Number, value => value >= min && value <= max)
}

const DirectionOptions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
const YesNo = t.enums.of(['Yes', 'No'])
const Direction = t.enums.of(DirectionOptions)
const Aspect = createBooleanStruct(DirectionOptions)
YesNo.getTcombFormFactory = () => t.form.Radio
Direction.getTcombFormFactory = () => t.form.Radio

const RequiredInformation = t.struct({
    title: t.String,
    datetime: t.refinement(DateTime, value => isPast(value)),
    latlng: GeoPosition,
})

const UploadSet = t.struct({
    files: t.maybe(FileList),
})

const SnowConditionOptions = [
    'Deep powder',
    'Wet',
    'Crusty',
    'Powder',
    'Heavy',
    'Wind affected',
    'Hard',
]
const RideTypeOptions = [
    'Mellow slopes',
    'Convex slopes',
    'Alpine slopes',
    'Dense trees',
    'Steep slopes',
    'Open trees',
    'Cut-blocks',
    'Sunny slopes',
]
const StayedAwayOptions = [
    'Convex slopes',
    'Alpine slopes',
    'Cut-blocks',
    'Sunny slopes',
    'Steep slopes',
    'Open trees',
]
const WeatherOptions = [
    'Warm',
    'Foggy',
    'Cloudy',
    'Stormy',
    'Windy',
    'Cold',
    'Wet',
    'Sunny',
]
const AvalancheConditionsOptions = ['snow', 'slab', 'sound', 'temp']

const Quick = t.struct({
    ridingConditions: t.maybe(
        t.struct({
            ridingQuality: t.maybe(
                t.enums.of(['Amazing', 'Good', 'OK', 'Terrible'])
            ),
            snowConditions: t.maybe(createBooleanStruct(SnowConditionOptions)),
            rideType: t.maybe(createBooleanStruct(RideTypeOptions)),
            stayedAway: t.maybe(createBooleanStruct(StayedAwayOptions)),
            weather: t.maybe(createBooleanStruct(WeatherOptions)),
        })
    ),
    avalancheConditions: t.maybe(
        createBooleanStruct(AvalancheConditionsOptions)
    ),
    comment: t.maybe(t.String),
})

const AvalancheCharacterOptions = [
    'Storm slab',
    'Wind slab',
    'Persistent slab',
    'Deep persistent slab',
    'Wet slab',
    'Cornice only',
    'Cornice with slab',
    'Loose wet',
    'Loose dry',
]
const ElevationBandOptions = ['Alpine', 'Treeline', 'Below treeline']
const WeakLayerCrystalTypeOptions = [
    'Surface hoar',
    'Facets',
    'Surface hoar and facets',
    'Depth hoar',
    'Storm snow',
]

const Avalanche = t.struct({
    avalancheOccurrence: t.refinement(DateTime, value => isPast(value)),
    avalancheObservation: t.maybe(
        t.enums.of([
            '12 hrs ago',
            '12-24 hrs ago',
            '>24-48 hrs ago',
            '>48 hrs ago',
        ])
    ),
    avalancheNumber: t.maybe(
        t.enums.of(['1', '2-5', '6-10', '11-50', '51-100'])
    ),
    avalancheSize: t.maybe(
        t.enums.of(['1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5'])
    ),
    slabThickness: t.maybe(range(10, 500)),
    slabWidth: t.maybe(range(1, 3000)),
    runLength: t.maybe(range(1, 10000)),
    avalancheCharacter: t.maybe(createBooleanStruct(AvalancheCharacterOptions)),
    triggerType: t.maybe(
        t.enums.of([
            'Natural',
            'Skier',
            'Snowmobile',
            'Other vehicle',
            'Helicopter',
            'Explosives',
        ])
    ),
    triggerSubtype: t.maybe(
        t.enums.of(['Accidental', 'Intentional', 'Remote'])
    ),
    triggerDistance: t.maybe(range(0, 2000)),
    startZoneAspect: t.maybe(Aspect),
    startZoneElevationBand: t.maybe(createBooleanStruct(ElevationBandOptions)),
    startZoneElevation: t.maybe(range(0, 5000)),
    startZoneIncline: t.maybe(range(0, 90)),
    runoutZoneElevation: t.maybe(range(0, 5000)),
    weakLayerBurialDate: t.maybe(t.refinement(t.Date, value => isPast(value))),
    weakLayerCrystalType: t.maybe(
        createBooleanStruct(WeakLayerCrystalTypeOptions)
    ),
    crustNearWeakLayer: t.maybe(YesNo),
    windExposure: t.maybe(
        t.enums.of([
            'Lee slope',
            'Cross-loaded slope',
            'Windward slope',
            'Down flow',
            'Reverse-loaded slope',
            'No wind exposure',
        ])
    ),
    vegetationCover: t.maybe(
        t.enums.of([
            'Open slope',
            'Sparse trees or gladed slope',
            'Dense trees',
        ])
    ),
    avalancheObsComment: t.maybe(t.String),
})

const SnowpackSurfaceConditionOptions = [
    'New snow',
    'Crust',
    'Surface hoar',
    'Facets',
    'Corn',
    'Variable',
]
const SnowpackTestFailureLayerCrystalTypeOptions = [
    'Surface hoar',
    'Facets',
    'Depth hoar',
    'Storm snow',
    'Crust',
    'Other',
]

const Snowpack = t.struct({
    snowpackObsType: t.maybe(t.enums.of(['Point observation', 'Summary'])),
    snowpackSiteElevation: t.maybe(range(0, 4000)),
    snowpackSiteElevationBand: t.maybe(
        createBooleanStruct(ElevationBandOptions)
    ),
    snowpackSiteAspect: t.maybe(Aspect),
    snowpackDepth: t.maybe(range(0, 10000)),
    snowpackWhumpfingObserved: t.maybe(YesNo),
    snowpackCrackingObserved: t.maybe(YesNo),
    snowpackSurfaceCondition: t.maybe(
        createBooleanStruct(SnowpackSurfaceConditionOptions)
    ),
    snowpackFootPenetration: t.maybe(range(0, 200)),
    snowpackSkiPenetration: t.maybe(range(0, 200)),
    snowpackSledPenetration: t.maybe(range(0, 200)),
    snowpackTestInitiation: t.maybe(
        t.enums.of(['None', 'Very easy', 'Easy', 'Moderate', 'Hard'])
    ),
    snowpackTestFracture: t.maybe(
        t.enums.of(['Sudden ("pop" or "drop")', 'Resistant', 'Uneven break'])
    ),
    snowpackTestFailure: t.maybe(range(0, 200)),
    snowpackTestFailureLayerCrystalType: t.maybe(
        createBooleanStruct(SnowpackTestFailureLayerCrystalTypeOptions)
    ),
    snowpackObsComment: t.maybe(t.String),
})

const Weather = t.struct({
    skyCondition: t.maybe(
        t.enums.of([
            'Clear',
            'Few clouds (<2/8)',
            'Scattered clouds (2/8-4/8)',
            'Broken clouds (5/8-7/8)',
            'Overcast (8/8)',
            'Fog',
        ])
    ),
    precipitationType: t.maybe(
        t.enums.of(['Snow', 'Rain', 'Mixed snow & rain', 'None'])
    ),
    snowfallRate: t.maybe(range(1, 20)),
    rainfallRate: t.maybe(
        t.enums.of(['Drizzle', 'Showers', 'Raining', 'Pouring'])
    ),
    temperature: t.maybe(range(-50, 40)),
    minTemp: t.maybe(range(-50, 30)),
    maxTemp: t.maybe(range(-40, 40)),
    temperatureTrend: t.maybe(t.enums.of(['Falling', 'Steady', 'Rising'])),
    newSnow24Hours: t.maybe(range(0, 100)),
    precipitation24Hours: t.maybe(range(0, 100)),
    stormSnowAmount: t.maybe(range(0, 300)),
    stormStartDate: t.maybe(t.Date),
    windSpeed: t.maybe(
        t.enums.of([
            'Calm',
            'Light (1-25 km/h)',
            'Moderate (26-40 km/h)',
            'Strong (41-60 km/h)',
            'Extreme (>60 km/h)',
        ])
    ),
    windDirection: t.maybe(Direction),
    blowingSnow: t.maybe(t.enums.of(['None', 'Light', 'Moderate', 'Intense'])),
    weatherObsComment: t.maybe(t.maybe(t.String)),
})

const TerrainTrapOptions = [
    'No obvious terrain trap',
    'Gully or depression',
    'Slope transition or bench',
    'Trees',
    'Cliff',
]

const Incident = t.struct({
    groupActivity: t.maybe(
        t.enums.of([
            'Snowmobiling',
            'Skiing',
            'Climbing/Mountaineering',
            'Hiking/Scrambling',
            'Snowshoeing',
            'Tobogganing',
            'Other',
        ])
    ),
    otherActivityDescription: t.maybe(t.String),
    groupDetails: t.maybe(
        t.struct({
            groupSize: t.maybe(range(1, 100)),
            numberFullyBuried: t.maybe(range(0, 100)),
            numberPartlyBuriedImpairedBreathing: t.maybe(range(0, 100)),
            numberPartlyBuriedAbleBreathing: t.maybe(range(0, 100)),
            numberCaughtOnly: t.maybe(range(0, 100)),
            numberPeopleInjured: t.maybe(range(0, 400)),
        })
    ),
    terrainShapeTriggerPoint: t.maybe(
        t.enums.of(['Convex', 'Planar', 'Concave', 'Unsupported'])
    ),
    snowDepthTriggerPoint: t.maybe(
        t.enums.of(['Shallow', 'Deep', 'Average', 'Variable'])
    ),
    terrainTrap: t.maybe(createBooleanStruct(TerrainTrapOptions)),
    incidentDescription: t.maybe(t.String),
    numberInvolved: t.maybe(t.Number),
})

const ObservationSet = t.subtype(
    t.struct(
        {
            [QUICK]: t.maybe(Quick),
            [AVALANCHE]: t.maybe(Avalanche),
            [SNOWPACK]: t.maybe(Snowpack),
            [WEATHER]: t.maybe(Weather),
            [INCIDENT]: t.maybe(Incident),
        },
        {
            name: 'ObservationSet',
            strict: true,
            defaultProps: {
                [QUICK]: null,
                [AVALANCHE]: null,
                [SNOWPACK]: null,
                [WEATHER]: null,
                [INCIDENT]: null,
            },
        }
    ),
    obs => {
        return Object.keys(obs).filter(key => Boolean(obs[key])).length > 0
    }
)

const Submission = t.struct({
    required: RequiredInformation,
    observations: ObservationSet,
    uploads: UploadSet,
})

export default Submission
