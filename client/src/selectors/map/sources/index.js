import {createSelector} from 'reselect'
import {List} from 'immutable'
import getForecastSource, {getCentroids} from './forecast'
import getHotZoneReportSource from './hotZoneReport'
import getMountainInformationNetworkSource from './mountainInformationNetwork'
import getWeatherStationSource from './weatherStation'

export default createSelector(
    getForecastSource,
    getCentroids,
    getHotZoneReportSource,
    getMountainInformationNetworkSource,
    getWeatherStationSource,
    (...args) => new List(args)
)
