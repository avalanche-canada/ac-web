import React, {PropTypes} from 'react'
import {compose, lifecycle, onlyUpdateForKeys, withProps, withHandlers} from 'recompose'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {Map as Base, Source, Layer, Marker} from 'components/map'
import {zoomChanged, centerChanged, loadStateChanged, loadData, featuresClicked, noFeaturesClicked} from 'actions/map'
import mapStateToProps from 'selectors/map'
import {Primary, Secondary, Menu, OpenMenu} from './drawers'
import * as Schemas from 'api/schemas'
import {pushNewLocation} from 'utils/router'

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
const LocationGenerator = new Map([
    [Schemas.ForecastRegion.getKey(), feature => ({
        pathname: `/map/forecasts/${feature.properties.id}`
    })],
    [Schemas.HotZoneArea.getKey(), feature => ({
        pathname: `/map/hot-zone-reports/${feature.properties.id}`
    })],
])

function Container({
    sources = [],
    layers = [],
    markers = [],
    primary,
    secondary,
    renderMarker,
    zoom,
    center,
    bounds,
    onMousemove,
    onMoveend,
    onZoomend,
    onClick,
    onLoad,
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

    return (
        <div>
            <Base {...props} >
                {sources.map(renderSource)}
                {layers.map(renderLayer)}
                {markers.map(renderMarker)}
            </Base>
            <Primary>
                {primary}
            </Primary>
            <Secondary>
                {secondary}
            </Secondary>
            <OpenMenu />
            <Menu />
        </div>
    )
}

export default compose(
    withRouter,
    connect(mapStateToProps, {
        zoomChanged,
        centerChanged,
        loadStateChanged,
        loadData,
        featuresClicked,
        noFeaturesClicked,
    }),
    onlyUpdateForKeys(['layers', 'sources', 'markers', 'bounds']),
    lifecycle({
        componentDidMount() {
            this.props.loadData()
        },
        componentWillUnmount() {
            this.props.loadStateChanged(false)
        },
    }),
    withHandlers({
        // TODO: To move
        onMarkerClick: props => ({location}, event) => {
            event.stopPropagation()

            pushNewLocation(location, props)
        },
        onMousemove: props => event => {
            const map = event.target

            if (!map.loaded()) {
                return
            }

            const canvas = map.getCanvas()
            const features = map.queryRenderedFeatures(event.point, {
                layers: getLayerIds(props.layers)
            })
            const [feature] = features

            canvas.style.cursor = features.length ? 'pointer' : null

            if (feature && feature.properties.title) {
                // TODO: Add a title propoerty to all features
                canvas.setAttribute('title', feature.properties.title)
            } else {
                canvas.removeAttribute('title')
            }
        },
        onMoveend: props => event => {
            const center = event.target.getCenter().toArray()
            const [lng, lat] = props.center

            if (center[0] !== lng || center[1] !== lat) {
                props.centerChanged(center)
            }
        },
        onZoomend: props => event => {
            if (props.zoom !== event.target.getZoom()) {
                props.zoomChanged(event.target.getZoom())
            }
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
                props.noFeaturesClicked()
            } else {
                for (var i = 0; i < features.length; i++) {
                    const feature = features[i]
                    const {source} = feature.layer

                    if (LocationGenerator.has(source)) {
                        return pushNewLocation(LocationGenerator.get(source)(feature), props)
                    }
                }

                props.featuresClicked(features)
            }
        },
        onLoad: props => event => {
            props.loadStateChanged(true)
        },
    }),
    withProps(({onMarkerClick}) => ({
        renderMarker(marker) {
            return <Marker key={marker.id} {...marker} onClick={onMarkerClick} />
        },
    }))
)(Container)
