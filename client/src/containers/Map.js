// import React, {PropTypes} from 'react'
// import {compose, lifecycle, onlyUpdateForKeys, withProps, withHandlers, withState, getContext} from 'recompose'
// import {List} from 'immutable'
// import {connect} from 'react-redux'
// import {withRouter} from 'react-router'
// import {Map, Source, Layer, Marker} from 'components/map'
// import {zoomChanged, centerChanged, loadData} from 'actions/map'
// import mapStateToProps from 'selectors/map'
// import {getLayerIds} from 'selectors/map/layers'
// import {MountainInformationNetworkSubmission} from 'api/schemas'
// import {pushNewLocation, pushQuery} from 'utils/router'
// import * as Layers from 'constants/map/layers'
// import {near} from 'utils/geojson'
//
// const EMPTY = new List()
//
// function getAllLayerIds(layers) {
//     return layers.map(layer => layer.id).toArray()
// }
// function renderSource(source) {
//     return <Source key={source.id} {...source} />
// }
// function renderLayer(layer) {
//     return <Layer key={layer.id} {...layer} />
// }
//
// function Container({
//     sources = EMPTY,
//     layers = EMPTY,
//     markers = EMPTY,
//     mountainInformationNetworkMarkers = EMPTY,
//     renderMarker,
//     renderMountainInformationNetworkMarker,
//     map,
//     ...props,
// }) {
//     return (
//         <Map {...props}>
//             {map && sources.map(renderSource)}
//             {map && layers.map(renderLayer)}
//             {map && markers.map(renderMarker)}
//             {map && mountainInformationNetworkMarkers.map(renderMountainInformationNetworkMarker)}
//         </Map>
//     )
// }
//
// function setForecastRegionsFilter(id = '') {
//     if (this) {
//         this.setFilter('forecast-regions-contour-hover', ['==', 'id', id])
//     }
// }
// function setActiveForecastRegion(name = '') {
//     if (this) {
//         this.setFilter('forecast-regions-active', ['==', 'id', name])
//         this.setFilter('forecast-regions-contour-active', ['==', 'id', name])
//     }
// }
//
// export default compose(
//     withRouter,
//     getContext({
//         location: PropTypes.object.isRequired,
//         params: PropTypes.object.isRequired,
//         routes: PropTypes.array.isRequired,
//     }),
//     connect(mapStateToProps, {
//         zoomChanged,
//         centerChanged,
//         loadData,
//     }),
//     // TODO: Split map into a container and create a layout
//     onlyUpdateForKeys(['layers', 'sources', 'markers', 'bounds', 'mountainInformationNetworkMarkers']),
//     withState('map', 'setMap', null),
//     withState('mountainInformationNetworkMarkers', 'setMountainInformationNetworkMarkers', EMPTY),
//     lifecycle({
//         componentDidMount() {
//             this.props.loadData()
//         },
//         componentDidUpdate() {
//             const {params, routes, map} = this.props
//
//             if (routes.find(route => route.path === 'forecasts')) {
//                 setActiveForecastRegion.call(map, params.name)
//             } else {
//                 setActiveForecastRegion.call(map)
//             }
//         },
//     }),
//     withHandlers({
//         onMarkerClick: props => ({location}, event) => {
//             event.stopPropagation()
//
//             pushNewLocation(location, props)
//         },
//         onMountainInformationNetworkMarkerClick: props => event => {
//
//         },
//         onMousemove: props => event => {
//             const map = event.target
//             const {point} = event
//
//             if (!map.loaded()) {
//                 return
//             }
//
//             const canvas = map.getCanvas()
//             const features = map.queryRenderedFeatures(point, {
//                 layers: getAllLayerIds(props.layers)
//             })
//
//             canvas.style.cursor = features.length ? 'pointer' : null
//
//             const [feature] = features
//
//             if (feature && feature.properties) {
//                 const {title, id} = feature.properties
//
//                 if (title) {
//                     canvas.setAttribute('title', title)
//                 } else {
//                     canvas.removeAttribute('title')
//                 }
//
//                 if (/^forecast-regions/.test(feature.layer.id)) {
//                     setForecastRegionsFilter.call(map, id)
//                 } else {
//                     setForecastRegionsFilter.call(map)
//                 }
//             } else {
//                 setForecastRegionsFilter.call(map)
//             }
//         },
//         onMoveend: props => event => {
//             const center = event.target.getCenter().toArray()
//
//             props.centerChanged(center)
//         },
//         onZoomend: props => event => {
//             const zoom = event.target.getZoom()
//
//             props.zoomChanged(zoom)
//         },
//         onClick: props => event => {
//             const map = event.target
//
//             if (!map.loaded()) {
//                 return
//             }
//
//             const {point} = event
//
//             // Handle Forecast layers
//             let features = map.queryRenderedFeatures(point, {
//                 layers: getLayerIds(Layers.FORECASTS)
//             })
//
//             if (features.length > 0) {
//                 const [feature] = features
//
//                 // TODO: Acces id directly when https://github.com/mapbox/mapbox-gl-js/issues/2716 gets fixed: properties.id > feature.id
//                 return pushNewLocation({
//                     pathname: `/map/forecasts/${feature.properties.id}`
//                 }, props)
//             }
//
//             // Handle Hot Zone Report layers
//             features = map.queryRenderedFeatures(point, {
//                 layers: getLayerIds(Layers.HOT_ZONE_REPORTS)
//             })
//
//             if (features.length > 0) {
//                 const [feature] = features
//
//                 // TODO: Acces id directly when https://github.com/mapbox/mapbox-gl-js/issues/2716 gets fixed: properties.id > feature.id
//                 return pushNewLocation({
//                     pathname: `/map/hot-zone-reports/${feature.properties.id}`
//                 }, props)
//             }
//
//             // Handle Mountain Information Network layers
//             features = map.queryRenderedFeatures(point, {
//                 layers: getLayerIds(Layers.MOUNTAIN_INFORMATION_NETWORK)
//             })
//
//             if (features.length > 0) {
//                 const [feature] = features
//                 const key = MountainInformationNetworkSubmission.getKey()
//
//                 if (feature.properties.cluster) {
//                     const {properties: {point_count}} = feature
//                     const {data} = props.sources.find(({id}) => id === key)
//                     const {bbox, options} = props.computeFitBounds(near(feature, data, point_count))
//
//                     map.fitBounds(bbox, options)
//                 } else {
//                     const {id} = feature.properties
//
//                     return pushQuery({
//                         panel: `${key}/${id}`
//                     }, props)
//                 }
//             }
//
//             // props.setMountainInformationNetworkMarkers(EMPTY)
//         },
//         onLoad: props => event => {
//             props.setMap(event.target)
//         },
//     }),
//     withProps(({onMarkerClick, onMountainInformationNetworkMarkerClick}) => ({
//         renderMarker({id, ...marker}) {
//             return <Marker key={id} {...marker} onClick={onMarkerClick} />
//         },
//         renderMountainInformationNetworkMarker({id, ...marker}) {
//             return <Marker key={id} {...marker} onClick={onMountainInformationNetworkMarkerClick} />
//         },
//     }))
// )(Container)

// Using a class

import React, {PropTypes, Component} from 'react'
import {compose, lifecycle, onlyUpdateForKeys, withProps, withHandlers, withState, getContext} from 'recompose'
import {List} from 'immutable'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {Map, Source, Layer, Marker} from 'components/map'
import {zoomChanged, centerChanged, loadData} from 'actions/map'
import mapStateToProps from 'selectors/map'
import {getLayerIds} from 'selectors/map/layers'
import {MountainInformationNetworkSubmission} from 'api/schemas'
import {pushNewLocation, pushQuery} from 'utils/router'
import * as Layers from 'constants/map/layers'
import {near} from 'utils/geojson'

const EMPTY = new List()

function getAllLayerIds(layers) {
    return layers.map(layer => layer.id).toArray()
}
function renderSource(source) {
    return <Source key={source.id} {...source} />
}
function renderLayer(layer) {
    return <Layer key={layer.id} {...layer} />
}

const forecastRegionsRegex = /^forecast-regions/

@withRouter
@connect(mapStateToProps, {
    zoomChanged,
    centerChanged,
    loadData,
})
class Container extends Component {
    state = {
        map: null,
        mountainInformationNetworkMarkers: EMPTY,
    }
    lastMouseMoveEvent = null
    processMouseMove = () => {
        if (this.lastMouseMoveEvent === null || !this.state.map) {
            return
        }

        const {map} = this.state
        const canvas = map.getCanvas()
        const {point} = this.lastMouseMoveEvent
        const features = map.queryRenderedFeatures(point, {
            layers: getAllLayerIds(this.props.layers)
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

            if (forecastRegionsRegex.test(feature.layer.id)) {
                this.setForecastRegionsFilter(id)
            } else {
                this.setForecastRegionsFilter()
            }
        } else {
            this.setForecastRegionsFilter()
        }

        this.lastMouseMoveEvent = null
    }
    handleMarkerClick = ({location}, event) => {
        event.stopPropagation()

        pushNewLocation(location, this.props)
    }
    handleMountainInformationNetworkMarkerClick = event => {

    }
    handleMousemove = event => {
        this.lastMouseMoveEvent = event
    }
    handleMoveend = event => {
        const center = event.target.getCenter().toArray()

        this.props.centerChanged(center)
    }
    handleZoomend = event => {
        const zoom = event.target.getZoom()

        this.props.zoomChanged(zoom)
    }
    handleClick = event => {
        const map = event.target

        if (!map.loaded()) {
            return
        }

        const {point} = event

        // Handle Forecast layers
        let features = map.queryRenderedFeatures(point, {
            layers: getLayerIds(Layers.FORECASTS)
        })

        if (features.length > 0) {
            const [feature] = features

            // TODO: Acces id directly when https://github.com/mapbox/mapbox-gl-js/issues/2716 gets fixed: properties.id > feature.id
            return pushNewLocation({
                pathname: `/map/forecasts/${feature.properties.id}`
            }, this.props)
        }

        // Handle Hot Zone Report layers
        features = map.queryRenderedFeatures(point, {
            layers: getLayerIds(Layers.HOT_ZONE_REPORTS)
        })

        if (features.length > 0) {
            const [feature] = features

            // TODO: Acces id directly when https://github.com/mapbox/mapbox-gl-js/issues/2716 gets fixed: properties.id > feature.id
            return pushNewLocation({
                pathname: `/map/hot-zone-reports/${feature.properties.id}`
            }, this.props)
        }

        // Handle Mountain Information Network layers
        features = map.queryRenderedFeatures(point, {
            layers: getLayerIds(Layers.MOUNTAIN_INFORMATION_NETWORK)
        })

        if (features.length > 0) {
            const [feature] = features
            const key = MountainInformationNetworkSubmission.getKey()

            if (feature.properties.cluster) {
                const {properties: {point_count}} = feature
                const {data} = this.props.sources.find(({id}) => id === key)
                const {bbox, options} = this.props.computeFitBounds(near(feature, data, point_count))

                map.fitBounds(bbox, options)
            } else {
                const {id} = feature.properties

                return pushQuery({
                    panel: `${key}/${id}`
                }, this.props)
            }
        }

        // props.setMountainInformationNetworkMarkers(EMPTY)
    }
    handleLoad = event => {
        this.setState({
            map: event.target
        })
    }
    setForecastRegionsFilter(id = '') {
        const {map} = this.state

        if (!map) {
            return
        }

        map.setFilter('forecast-regions-contour-hover', ['==', 'id', id])
    }
    setActiveForecastRegion(name = '') {
        const {map} = this.state

        if (!map) {
            return
        }

        map.setFilter('forecast-regions-active', ['==', 'id', name])
        map.setFilter('forecast-regions-contour-active', ['==', 'id', name])
    }
    componentDidMount() {
        this.props.loadData()

        this.intervalID = setInterval(this.processMouseMove, 150)
    }
    componentDidUpdate() {
        const {params, routes} = this.props
        const map = this.state

        if (routes.find(route => route.path === 'forecasts')) {
            this.setActiveForecastRegion(params.name)
        } else {
            this.setActiveForecastRegion()
        }
    }
    componentWillUnmount() {
        clearInterval(this.intervalID)
    }
    shouldComponentUpdate({layers, sources, markers, bounds}, {map, mountainInformationNetworkMarkers}) {
        const {props, state} = this

        if (layers === props.layers &&
            sources === props.sources &&
            markers === props.markers &&
            bounds === props.bounds &&
            map === state.map &&
            mountainInformationNetworkMarkers === state.mountainInformationNetworkMarkers
        ) {
            return false
        }

        return true
    }
    renderMarker = ({id, ...marker}) => {
        return <Marker key={id} {...marker} onClick={this.handleMarkerClick} />
    }
    renderMountainInformationNetworkMarker = ({id, ...marker}) => {
        return <Marker key={id} {...marker} onClick={this.handleMountainInformationNetworkMarkerClick} />
    }
    render() {
        const {
            map,
            mountainInformationNetworkMarkers = EMPTY
        } = this.state
        const {
            sources = EMPTY,
            layers = EMPTY,
            markers = EMPTY,
            ...props,
        } = this.props
        const events = {
            onMousemove: this.handleMousemove,
            onMoveend: this.handleMoveend,
            onZoomend: this.handleZoomend,
            onClick: this.handleClick,
            onLoad: this.handleLoad,
        }

        return (
            <Map {...props} {...events}>
                {map && sources.map(renderSource)}
                {map && layers.map(renderLayer)}
                {map && markers.map(this.renderMarker)}
                {map && mountainInformationNetworkMarkers.map(this.renderMountainInformationNetworkMarker)}
            </Map>
        )
    }
}

export default getContext({
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    routes: PropTypes.array.isRequired,
})(Container)
