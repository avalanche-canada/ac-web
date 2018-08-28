import { schema } from 'normalizr'

const { Entity } = schema

export const ForecastRegion = new Entity('forecast-regions')
export const HotZone = new Entity('hot-zones')
export const MountainInformationNetworkSubmission = new Entity(
    'mountain-information-network-submissions',
    undefined,
    {
        idAttribute: 'subid',
    }
)
export const WeatherStation = new Entity('weather-stations', undefined, {
    idAttribute: 'stationId',
})
export const MountainConditionsReport = new Entity(
    'mountain-conditions-reports'
)
