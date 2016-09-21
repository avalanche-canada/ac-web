import {createSelector} from 'reselect'
import {List} from 'immutable'
import getForecastSource, {getCentroids} from './forecast'
import getHotZoneReportSource from './hotZoneReport'
// import getMountainInformationNetworkSource from './mountainInformationNetwork'

export default createSelector(
    getForecastSource,
    getCentroids,
    getHotZoneReportSource,
    // getMountainInformationNetworkSource,
    (...args) => List.of(...args)
)
