import {createSelector} from 'reselect'
import {ForecastRegion, HotZoneArea} from 'api/schemas'
import {getEntitiesForSchema, hasEntitiesForSchema} from 'reducers/entities'
import {getZoom, getCenter} from 'reducers/map'
import bbox from 'turf-bbox'

function toCentroid(feature) {
    const coordinates = feature.getIn(['properties', 'centroid'])

    return {
        ...feature.toJSON(),
        geometry: {
            type: 'Point',
            coordinates
        }
    }
}

function createSource(id, features) {
    return {
        id,
        type: 'geojson',
        data: {
            type: 'FeatureCollection',
            features,
        }
    }
}

const getSources = createSelector(
    state => getEntitiesForSchema(state, ForecastRegion),
    state => getEntitiesForSchema(state, HotZoneArea),
    function computeSources(forecastRegions, hotZoneAreas) {
        const sources = []

        if (forecastRegions) {
            const key = ForecastRegion.getKey()

            sources.push(createSource(key, forecastRegions.toArray()))
            sources.push(createSource(`${key}-centroid`, forecastRegions.map(toCentroid).toArray()))
        }

        if (hotZoneAreas) {
            const key = HotZoneArea.getKey()

            sources.push(createSource(key, hotZoneAreas.toArray()))
        }

        return sources
    }
)

const getLayers = createSelector(
    state => hasEntitiesForSchema(state, ForecastRegion),
    state => hasEntitiesForSchema(state, HotZoneArea),
    function computeLayers(hasForecastRegions, hasHotZoneAreas) {
        const layers = []

        if (hasForecastRegions) {
            let key = ForecastRegion.getKey()

            layers.push({
                id: key,
                source: key,
                type: 'fill',
                paint: {
                    'fill-color': '#3BB2D0',
                    'fill-opacity': 0.5,
                },
                events: {
                    click: ::console.log
                }
            })
            layers.push({
                id: `${key}-contour`,
                source: key,
                type: 'line',
                paint: {
                    'line-color': '#FF00FF',
                    'line-width': 1.5,
                },
            })
            layers.push({
                id: `${key}-labels`,
                source: `${key}-centroid`,
                type: 'symbol',
                layout: {
                    'text-field': '{name}',
                    'text-ignore-placement': true,
                    'icon-image': 'harbor-15',
                    'text-size': 14,
                    'text-offset': [0, 0.6],
                    'text-anchor': 'top',
                },
                paint: {
                    'text-halo-color': 'rgba(255, 255, 255, 0.5)',
                    'text-halo-width': 1,
                },
            })
        }

        if (hasHotZoneAreas) {
            key = HotZoneArea.getKey()

            layers.push({
                id: key,
                source: key,
                type: 'fill',
                paint: {
                    'fill-color': '#ffffff',
                    'fill-outline-color': '#FF00FF',
                    'fill-opacity': 0.5
                },
                events: {
                    click: ::console.log
                }
            })
        }

        return layers
    }
)

function getActiveForecastRegion(state, props) {
    const {name} = props.params

    return getEntitiesForSchema(state, ForecastRegion).get(name)
}

const getBounds = createSelector(
    getActiveForecastRegion,
    function computeBounds(region) {
        return region ? bbox(region.toJSON()) : null
    }
)

export const getMapProps = createSelector(
    getZoom,
    getCenter,
    getSources,
    getLayers,
    getBounds,
    function computeMapProps(zoom, center, sources, layers, bounds) {
        return {
            state: {
                zoom,
                center,
            },
            bounds,
            sources,
            layers,
        }
    }
)
