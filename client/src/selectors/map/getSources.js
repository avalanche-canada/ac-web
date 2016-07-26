import Immutable from 'immutable'
import {createSelector} from 'reselect'
import {ForecastRegion, HotZoneArea} from 'api/schemas'
import {getEntitiesForSchema} from 'reducers/api/entities'

function toCentroid(feature) {
    const coordinates = feature.getIn(['properties', 'centroid'])

    return {
        ...feature.toJSON(),
        geometry: {
            type: 'Point',
            coordinates,
        }
    }
}

function createSource(id, features = []) {
    return {
        id,
        type: 'geojson',
        data: {
            type: 'FeatureCollection',
            features,
        }
    }
}

const getForecastRegions = createSelector(
    state => getEntitiesForSchema(state, ForecastRegion),
    features => features.toArray()
)
const getHotZoneAreaSource = createSelector(
    state => getEntitiesForSchema(state, HotZoneArea),
    features => features.toArray()
)

const forecastRegionKey = ForecastRegion.getKey()
const hotZoneAreaKey = HotZoneArea.getKey()

export default createSelector(
    getForecastRegions,
    getHotZoneAreaSource,
    function createSources(forecastRegions, hotZoneAreas) {
        return [
            createSource(forecastRegionKey, forecastRegions),
            createSource(`${forecastRegionKey}-centroid`, forecastRegions.map(toCentroid)),
            createSource(hotZoneAreaKey, hotZoneAreas),
        ]
    }
)
