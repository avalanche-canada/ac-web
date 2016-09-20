import {createSelector} from 'reselect'
import {List} from 'immutable'
import getForecastSource from './forecast'
import getHotZoneReportSource from './hotZoneReport'
import getMountainInformationNetworkSource from './mountainInformationNetwork'

export default createSelector(
    getForecastSource,
    getHotZoneReportSource,
    getMountainInformationNetworkSource,
    (...args) => List.of(...args)
)
