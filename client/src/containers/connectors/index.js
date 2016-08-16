import connector from './connector'
import {
    loadForecast,
    loadHotZoneReport,
    loadForecastRegions,
    loadHotZoneAreas,
} from 'actions/entities'
import getForecast from 'selectors/forecast'
import getHotZoneReport from 'selectors/hotZoneReport'

export const forecast = connector(getForecast, loadForecast, loadForecastRegions)
export const hotZoneReport = connector(getHotZoneReport, loadHotZoneReport, loadHotZoneAreas)
