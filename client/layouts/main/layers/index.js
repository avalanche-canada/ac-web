import * as types from 'constants/drawers'
import WeatherStations from './WeatherStations'
import MountainInformationNetwork from './MountainInformationNetwork'
import FatalAccidents from './FatalAccidents'
import SpecialInformation from './SpecialInformation'
import HotZones from './HotZones'
import MountainConditionReports from './MountainConditionReports'
import ForecastRegions from './ForecastRegions'

export default new Map([
    [types.WEATHER_STATION, WeatherStations],
    [types.MOUNTAIN_INFORMATION_NETWORK, MountainInformationNetwork],
    [types.FATAL_ACCIDENT, FatalAccidents],
    [types.SPECIAL_INFORMATION, SpecialInformation],
    [types.HOT_ZONE_REPORTS, HotZones],
    [types.MOUNTAIN_CONDITIONS_REPORTS, MountainConditionReports],
    [types.FORECASTS, ForecastRegions],
])
