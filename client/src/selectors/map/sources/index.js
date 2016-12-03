import {createSelector} from 'reselect'
import {List} from 'immutable'
import getMountainInformationNetworkSource from './mountainInformationNetwork'
import getWeatherStationSource from './weatherStation'
import getToyotaTruckSource from './toyota'

export default createSelector(
    getMountainInformationNetworkSource,
    getWeatherStationSource,
    getToyotaTruckSource,
    (...sources) => new List(sources)
)
