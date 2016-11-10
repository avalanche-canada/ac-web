import {createSelector} from 'reselect'
import {List} from 'immutable'
import getForecastSource, {getCentroids} from './forecast'
import getHotZoneReportSource from './hotZoneReport'
import getMountainInformationNetworkSource from './mountainInformationNetwork'
import getWeatherStationSource from './weatherStation'
import getToyotaTruckSource from './toyota'

export default createSelector(
    getForecastSource,
    getCentroids,
    getHotZoneReportSource,
    getMountainInformationNetworkSource,
    getWeatherStationSource,
    getToyotaTruckSource,
    (...args) => new List(args)
)
