import React, {PropTypes} from 'react'
import {compose, lifecycle, onlyUpdateForKeys, withProps, withHandlers, withState} from 'recompose'
import {List} from 'immutable'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {Map as Base, Source, Layer, Marker} from 'components/map'
import {zoomChanged, centerChanged, loadData} from 'actions/map'
import mapStateToProps from 'selectors/map'
import {Primary, Secondary, Menu, OpenMenu} from './drawers'
import * as Schemas from 'api/schemas'
import {pushNewLocation, pushQuery} from 'utils/router'

const EMPTY = new List()

function getLayerIds(layers) {
    return layers.map(layer => layer.id).toArray()
}
function renderSource(source) {
    return <Source key={source.id} {...source} />
}
function renderLayer(layer) {
    return <Layer key={layer.id} {...layer} />
}

// TODO: Acces id directly when https://github.com/mapbox/mapbox-gl-js/issues/2716 gets fixed: properties.id > feature.id
// TODO: Implements a better way usong RegExp
const LocationGenerator = new Map([
    [Schemas.ForecastRegion.getKey(), feature => ({
        pathname: `/map/forecasts/${feature.properties.id}`
    })],
    [`${Schemas.ForecastRegion.getKey()}-centroids`, feature => ({
        pathname: `/map/forecasts/${feature.properties.id}`
    })],
    [Schemas.HotZoneArea.getKey(), feature => ({
        pathname: `/map/hot-zone-reports/${feature.properties.id}`
    })],
])

function Container({
    sources = EMPTY,
    layers = EMPTY,
    markers = EMPTY,
    primary,
    renderMarker,
    zoom,
    center,
    bounds,
    onMousemove,
    onMoveend,
    onZoomend,
    onClick,
    onLoad,
    map,
    location,
}) {
    const props = {
        zoom,
        center,
        bounds,
        onMousemove,
        onMoveend,
        onZoomend,
        onClick,
        onLoad,
    }
    // TODO: This container should be a layout that renders a map and all drawers.
    // TODO: Passing location to Secondary => there most be a better way to do that. Perhaps passing the component as named component.
    return (
        <div>
            <Base {...props}>
                {map && sources.map(renderSource)}
                {map && layers.map(renderLayer)}
                {map && markers.map(renderMarker)}
            </Base>
            <Primary>
                {primary}
            </Primary>
            <Secondary location={location} />
            <OpenMenu />
            <Menu />
        </div>
    )
}

function setForecastRegionsFilter(id = '') {
    this.setFilter('forecast-regions-contour-hover', ['==', 'id', id])
}
function setActiveForecastRegion(name = '') {
    this.setFilter('forecast-regions-active', ['==', 'id', name])
    this.setFilter('forecast-regions-contour-active', ['==', 'id', name])
}

export default compose(
    withRouter,
    connect(mapStateToProps, {
        zoomChanged,
        centerChanged,
        loadData,
    }),
    // TODO: Split map into a container and create a layout
    onlyUpdateForKeys(['layers', 'sources', 'markers', 'bounds']),
    withState('map', 'setMap', null),
    lifecycle({
        componentDidMount() {
            this.props.loadData()
        },
        componentDidUpdate() {
            const {params, routes, map} = this.props

            if (map && routes.find(route => route.path === 'forecasts')) {
                setActiveForecastRegion.call(map, params.name)
            } else {
                setActiveForecastRegion.call(map)
            }
        },
    }),
    withHandlers({
        onMarkerClick: props => ({location}, event) => {
            event.stopPropagation()

            pushNewLocation(location, props)
        },
        onMousemove: props => event => {
            const map = event.target
            const {point} = event

            if (!map.loaded()) {
                return
            }

            const canvas = map.getCanvas()
            const features = map.queryRenderedFeatures(point, {
                layers: getLayerIds(props.layers)
            })

            canvas.style.cursor = features.length ? 'pointer' : null

            const [feature] = features

            if (feature && feature.properties) {
                const {title, id} = feature.properties

                if (title) {
                    canvas.setAttribute('title', title)
                } else {
                    canvas.removeAttribute('title')
                }

                if (map && /^forecast-regions/.test(feature.layer.id)) {
                    setForecastRegionsFilter.call(map, id)
                } else {
                    setForecastRegionsFilter.call(map)
                }
            } else {
                setForecastRegionsFilter.call(map)
            }
        },
        onMoveend: props => event => {
            const center = event.target.getCenter().toArray()
// console.warn(center)
            props.centerChanged(center)
        },
        onZoomend: props => event => {
            const zoom = event.target.getZoom()
// console.warn(zoom)
            props.zoomChanged(zoom)
        },
        onClick: props => event => {
            const map = event.target

            if (!map.loaded()) {
                return
            }

            const features = map.queryRenderedFeatures(event.point, {
                layers: getLayerIds(props.layers)
            })

            if (features.length === 0) {
                // TODO: Deal with clusters later ;)
            } else {
                for (var i = 0; i < features.length; i++) {
                    const feature = features[i]
                    const {layer} = feature
                    const {source} = layer

                    if (LocationGenerator.has(source)) {
                        return pushNewLocation(LocationGenerator.get(source)(feature), props)
                    }
                }

            }
        },
        onLoad: props => event => {
            props.setMap(event.target)
        },
    }),
    withProps(({onMarkerClick}) => ({
        renderMarker(marker) {
            return <Marker key={marker.id} {...marker} onClick={onMarkerClick} />
        },
    }))
)(Container)
