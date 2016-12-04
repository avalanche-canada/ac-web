import {createStructuredSelector} from 'reselect'
import getMountainInformationNetworkSource from './mountainInformationNetwork'
import getWeatherStationSource from './weatherStation'
import getToyotaTruckSource from './toyota'
import * as Layers from 'constants/drawers'

export default createStructuredSelector({
    [Layers.MOUNTAIN_INFORMATION_NETWORK]: getMountainInformationNetworkSource,
    [Layers.WEATHER_STATION]: getWeatherStationSource,
    [Layers.TOYOTA_TRUCK_REPORTS]: getToyotaTruckSource,
})
