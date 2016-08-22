import {Schema} from 'normalizr'

export const ForecastRegion = new Schema('forecast-regions')
export const Forecast = new Schema('forecasts')
export const HotZoneArea = new Schema('hot-zone-areas')
export const HotZoneReport = new Schema('hot-zone-reports')
export const MountainInformationNetworkObservation = new Schema('mountain-information-network-observations', {idAttribute: 'obid'})
export const MountainInformationNetworkSubmission = new Schema('mountain-information-network-submissions', {idAttribute: 'subid'})
export const MountainConditionReport = new Schema('mountain-condition-reports')
export const Incident = new Schema('incidents')

const Schemas = new Map([
    [ForecastRegion.getKey(), ForecastRegion],
    [Forecast.getKey(), Forecast],
    [HotZoneArea.getKey(), HotZoneArea],
    [HotZoneReport.getKey(), HotZoneReport],
    [MountainInformationNetworkObservation.getKey(), MountainInformationNetworkObservation],
    [MountainInformationNetworkSubmission.getKey(), MountainInformationNetworkSubmission],
    [MountainConditionReport.getKey(), MountainConditionReport],
    [Incident.getKey(), Incident],
])

export function getSchemaByKey(key) {
    return Schemas.get(key)
}
