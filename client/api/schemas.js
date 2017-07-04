import { schema } from 'normalizr'

function obsSorter(left, right) {
    return left.obtype.localeCompare(right.obtype)
}

export const ForecastRegion = new schema.Entity('forecast-regions')
export const Forecast = new schema.Entity('forecasts')
export const HotZone = new schema.Entity('hot-zones')
export const HotZoneReport = new schema.Entity(
    'hot-zone-reports',
    {},
    {
        idAttribute: 'hotzoneid',
    }
)
export const MountainInformationNetworkSubmission = new schema.Entity(
    'mountain-information-network-submissions',
    {},
    {
        idAttribute: 'subid',
        processStrategy(entity) {
            return {
                ...entity,
                obs: entity.obs.sort(obsSorter),
            }
        },
    }
)
export const Provider = new schema.Entity('providers')
export const Course = new schema.Entity('courses')
export const WeatherStation = new schema.Entity(
    'weather-stations',
    {},
    {
        idAttribute: 'stationId',
    }
)
export const MountainConditionsReport = new schema.Entity(
    'mountain-conditions-reports'
)
