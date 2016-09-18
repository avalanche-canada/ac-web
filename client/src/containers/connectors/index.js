import connector from './connector'
import {
    loadForecast,
    loadHotZoneReports,
    loadForecastRegions,
    loadHotZoneAreas,
} from 'actions/entities'
import getForecast from 'selectors/forecast'
import getHotZoneReport from 'selectors/hotZoneReport'

export const forecast = connector(getForecast, loadForecast, loadForecastRegions)
export const hotZoneReport = connector(getHotZoneReport, loadHotZoneReports, loadHotZoneAreas)
