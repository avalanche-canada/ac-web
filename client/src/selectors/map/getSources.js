import Immutable from 'immutable'
import {createSelector} from 'reselect'
import getMenu from 'selectors/menu'
import {getResultsSet} from 'reducers/api/getters'
import {point, featureCollection} from 'turf-helpers'
import {
    ForecastRegion,
    HotZoneArea,
    HotZoneReport,
    MountainInformationNetworkSubmission,
} from 'api/schemas'
import {getEntitiesForSchema} from 'reducers/api/entities'
import {MOUNTAIN_INFORMATION_NETWORK} from 'constants/map/layers'

function createSource(id, features = [], props = {}) {
    return {
        id,
        type: 'geojson',
        data: featureCollection(features),
        ...props,
    }
}

const getForecastRegions = createSelector(
    state => getEntitiesForSchema(state, ForecastRegion),
    features => features.toList().toJSON()
)
const getHotZoneAreaSource = createSelector(
    state => getEntitiesForSchema(state, HotZoneArea),
    state => getEntitiesForSchema(state, HotZoneReport),
    (areas, reports) => {
        function updateArea(area) {
            const active = Number(reports.has(area.get('id')))

            return area.setIn(['properties', 'active'], active)
        }

        return areas.map(updateArea).toList().toJSON()
    }
)
const getDaysFilterValue = createSelector(
    getMenu,
    ({layers}) => layers.getIn([MOUNTAIN_INFORMATION_NETWORK, 'filters', 'days']).value
)
const getMountainInformationNetworkSubmissionsResults = createSelector(
    getDaysFilterValue,
    state => state,
    (days, state) => getResultsSet(state, MountainInformationNetworkSubmission, {days})
)

export const getMountainInformationNetworkSubmissions = createSelector(
    state => getEntitiesForSchema(state, MountainInformationNetworkSubmission),
    getMountainInformationNetworkSubmissionsResults,
    (entities, {isLoading, ids}) => {
        if (isLoading) {
            return []
        }

        return Array.from(ids).map(id => entities.get(id)).map(entity => {
            const {latlng, ...properties} = entity.toJSON()
            const [lat, lng] = latlng

            return point([lng, lat], properties)
        })
    }
)

const forecastRegionKey = ForecastRegion.getKey()
const hotZoneAreaKey = HotZoneArea.getKey()
const mountainInformationNetworkSubmissionKey = MountainInformationNetworkSubmission.getKey()

export default createSelector(
    getForecastRegions,
    getHotZoneAreaSource,
    getMountainInformationNetworkSubmissions,
    function createSources(forecastRegions, hotZoneAreas, submissions) {
        return [
            createSource(forecastRegionKey, forecastRegions),
            createSource(hotZoneAreaKey, hotZoneAreas),
            createSource(mountainInformationNetworkSubmissionKey, submissions, {
                cluster: true
            }),
        ]
    }
)
