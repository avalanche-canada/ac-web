import {handleActions} from 'redux-actions'
import {List} from 'immutable'
import * as MapActions from 'actions/map'
import * as EntitiesActions from 'actions/entities'
import ForecastSource, {addToSource as addForecastsToSource} from './forecast'
import HotZoneReportSource, {addToSource as addHotZoneReportsToSource} from './hotZoneReport'
import MountainInformationNetworkSource, {addToSource as addMountainInformationNetworksToSource} from './mountainInformationNetwork'

const EMPTY = new List()
let SOURCES = List.of(
    ForecastSource,
    HotZoneReportSource,
    MountainInformationNetworkSource
)

function handleMapStateChanged(state, {payload}) {
    return payload ? SOURCES : EMPTY
}

function createHandler(addToSource) {
    return (state, action) => {
        if (state === EMPTY) {
            SOURCES = addToSource(SOURCES, action)

            return state
        } else {
            return addToSource(state, action)
        }
    }
}

export default handleActions({
    [MapActions.LOAD_STATE_CHANGED]: handleMapStateChanged,
    [EntitiesActions.MOUNTAIN_INFORMATION_NETWORK_SUBMISSIONS_SUCCESS]: createHandler(addMountainInformationNetworksToSource),
    [EntitiesActions.HOT_ZONE_REPORTS_SUCCESS]: createHandler(addHotZoneReportsToSource),
    [EntitiesActions.HOT_ZONE_AREAS_SUCCESS]: createHandler(addHotZoneReportsToSource),
    [EntitiesActions.FORECAST_REGIONS_SUCCESS]: createHandler(addForecastsToSource),
}, EMPTY)
