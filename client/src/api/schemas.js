import {Schema} from 'normalizr'

export const ForecastRegion = new Schema('forecast-regions')
export const Forecast = new Schema('forecasts')
export const HotZone = new Schema('hot-zones')
export const MountainInformationNetworkSubmission = new Schema('mountain-information-network-submissions', {idAttribute: 'subid'})
export const MountainConditionReport = new Schema('mountain-condition-reports')
export const Incident = new Schema('incidents')
export const Provider = new Schema('providers')
export const Course = new Schema('courses')
export const WeatherStation = new Schema('weather-stations', {idAttribute: 'stationId'})
