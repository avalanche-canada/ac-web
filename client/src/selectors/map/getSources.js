import Immutable from 'immutable'
import {createSelector} from 'reselect'
import {ForecastRegion, HotZoneArea} from 'api/schemas'
import {getEntitiesForSchema} from 'reducers/entities'

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

export default createSelector(
    getForecastRegions,
    getHotZoneAreaSource,
    function createSources(forecastRegions, hotZoneAreas) {
        return [
            createSource(ForecastRegion.getKey(), forecastRegions),
            createSource(`${ForecastRegion.getKey()}-centroid`, forecastRegions.map(toCentroid)),
            createSource(HotZoneArea.getKey(), hotZoneAreas),
        ]
    }
)
