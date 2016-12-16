import {Schema} from 'normalizr'

function obsSorter(left, right) {
    return left.obtype.localeCompare(right.obtype)
}

export const ForecastRegion = new Schema('forecast-regions')
export const Forecast = new Schema('forecasts')
export const HotZoneArea = new Schema('hot-zone-areas')
export const HotZoneReport = new Schema('hot-zone-reports', {idAttribute: 'hotzoneid'})
export const MountainInformationNetworkSubmission = new Schema('mountain-information-network-submissions', {
    idAttribute: 'subid',
    assignEntity(output, key, value, input) {
        output[key] = key === 'obs' ? value.sort(obsSorter) : value
    }
})
export const MountainConditionReport = new Schema('mountain-condition-reports')
export const Incident = new Schema('incidents')
export const Provider = new Schema('providers')
export const Course = new Schema('courses')
export const WeatherStation = new Schema('weather-stations', {idAttribute: 'stationId'})
