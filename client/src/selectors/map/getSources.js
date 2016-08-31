import Immutable from 'immutable'
import {createSelector} from 'reselect'
import getMenu from 'selectors/menu'
import {getResultsSet} from 'reducers/api/getters'
import turf from 'turf-helpers'
import {
    ForecastRegion,
    HotZoneArea,
    MountainInformationNetworkObservation,
} from 'api/schemas'
import {getEntitiesForSchema} from 'reducers/api/entities'
import {MOUNTAIN_INFORMATION_NETWORK} from 'constants/map/layers'

function toCentroid(feature) {
    const {centroid, ...properties} = feature.properties

    return turf.point(centroid, properties)
}

function createSource(id, features = [], props = {}) {
    return {
        id,
        type: 'geojson',
        data: turf.featureCollection(features),
        ...props,
    }
}

const getForecastRegions = createSelector(
    state => getEntitiesForSchema(state, ForecastRegion),
    features => features.toList().toJSON()
)
const getHotZoneAreaSource = createSelector(
    state => getEntitiesForSchema(state, HotZoneArea),
    features => features.toList().toJSON()
)
const getDaysFilterValue = createSelector(
    getMenu,
    ({layers}) => layers.getIn([MOUNTAIN_INFORMATION_NETWORK, 'filters', 'days']).value
)
const getMountainInformationNetworkObservationsResults = createSelector(
    getDaysFilterValue,
    state => state,
    (days, state) => getResultsSet(state, MountainInformationNetworkObservation, {days})
)

export const getMountainInformationNetworkObservations = createSelector(
    state => getEntitiesForSchema(state, MountainInformationNetworkObservation),
    getMountainInformationNetworkObservationsResults,
    (entities, results) => {
        if (!results) {
            return []
        }

        const ids = [...results.ids]

        return ids.map(id => entities.get(id)).map(entity => {
            const {latlng, ...properties} = entity.toJSON()
            const [lat, lng] = latlng

            return turf.point([lng, lat], properties)
        })
    }
)

const getMountainInformationNetworkSubmissions = createSelector(
    getMountainInformationNetworkObservations,
    observations => observations.reduce((submissions, observation) => {

    }, [])
)

const forecastRegionKey = ForecastRegion.getKey()
const hotZoneAreaKey = HotZoneArea.getKey()
const mountainInformationNetworkObservationKey = MountainInformationNetworkObservation.getKey()

export default createSelector(
    getForecastRegions,
    getHotZoneAreaSource,
    getMountainInformationNetworkObservations,
    function createSources(forecastRegions, hotZoneAreas, observations) {
        return [
            createSource(forecastRegionKey, forecastRegions),
            createSource(`${forecastRegionKey}-centroid`, forecastRegions.map(toCentroid)),
            createSource(hotZoneAreaKey, hotZoneAreas),
            createSource(mountainInformationNetworkObservationKey, observations, {
                cluster: true
            }),
        ]
    }
)
