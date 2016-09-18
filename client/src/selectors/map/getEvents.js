import {createSelector, createStructuredSelector} from 'reselect'
import {getLocation, getRouter} from 'selectors/utils'
import {activateCluster, deactivateCluster} from 'actions/map'
import {getIds} from './getLayers'
import {
    ForecastRegion,
    HotZoneArea,
    MountainInformationNetworkSubmission,
} from 'api/schemas'

const PATHNAMES_BY_SOURCE = new Map([
    [ForecastRegion.getKey(), 'forecasts'],
    [HotZoneArea.getKey(), 'hot-zone-reports'],
])

// TODO: Rework that!!!!

const CLUSTERS_ACTIVATION = new Map([
    [`${MountainInformationNetworkSubmission.getKey()}-cluster-circle`, id => ({
        panel: `${MountainInformationNetworkSubmission.getKey()}:${id}`
    })],
])

const onClick = createSelector(
    getIds,
    getRouter,
    getLocation,
    (layers, router, location) => dispatch => event => {
        const map = event.target

        if (!map.loaded()) {
            return
        }

        const features = map.queryRenderedFeatures(event.point, {layers})

        if (features.length === 0) {
            dispatch(deactivateCluster())
        }

        for (var i = 0; i < features.length; i++) {
            const feature = features[i]
            const {layer, properties} = feature
            const {source, id} = layer

            if (PATHNAMES_BY_SOURCE.has(source)) {
                // TODO: Acces id directly when https://github.com/mapbox/mapbox-gl-js/issues/2716 gets fixed: properties.id > feature.id
                const pathname = `/map/${PATHNAMES_BY_SOURCE.get(source)}/${properties.id}`
                const {query} = location

                router.push({
                    pathname,
                    query,
                })

                return
            } else if (CLUSTERS_ACTIVATION.has(id)) {
                const {point_count, cluster} = properties
                const {pathname} = location

                if (cluster) {
                    dispatch(activateCluster(feature))
                }
            }
        }
    }
)

const onMousemove = createSelector(
    getIds,
    layers => event => {
        const map = event.target

        if (!map.loaded()) {
            return
        }

        const canvas = map.getCanvas()
        const features = map.queryRenderedFeatures(event.point, {layers})
        const [feature] = features

        canvas.style.cursor = features.length ? 'pointer' : null

        if (feature && feature.properties.name) {
            canvas.setAttribute('title', feature.properties.name)
        } else {
            canvas.removeAttribute('title')
        }

        // // TODO: Acces id directly when https://github.com/mapbox/mapbox-gl-js/issues/2716 gets fixed: feature.properties.id > feature.id
        // const layers = [`${key}-hover`, `${key}-contour-hover`]
        // const filter = ['==', 'id', feature ? feature.properties.id : '']
        //
        // layers.forEach(layer => {
        //     if (map.getLayer(layer)) {
        //         map.setFilter(layer, filter)
        //     }
        // })
    }
)


export default createStructuredSelector({
    onClick,
    onMousemove,
})
