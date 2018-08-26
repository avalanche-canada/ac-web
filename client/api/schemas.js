import { schema } from 'normalizr'

const { Entity } = schema

export const ForecastRegion = new Entity('forecast-regions')
export const Forecast = new Entity('forecasts')
export const HotZone = new Entity('hot-zones')
export const HotZoneReport = new Entity('hot-zone-reports', undefined, {
    idAttribute: 'hotzoneid',
})
export const MountainInformationNetworkSubmission = new Entity(
    'mountain-information-network-submissions',
    undefined,
    {
        idAttribute: 'subid',
    }
)
export const Provider = new Entity('providers')
export const WeatherStation = new Entity('weather-stations', undefined, {
    idAttribute: 'stationId',
})
export const MountainConditionsReport = new Entity(
    'mountain-conditions-reports'
)
