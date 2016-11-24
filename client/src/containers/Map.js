import React, {PropTypes, Component} from 'react'
import {compose, lifecycle, onlyUpdateForKeys, withProps, withHandlers, withState, getContext} from 'recompose'
import {List} from 'immutable'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {Map, Source, Layer, Marker} from 'components/map'
import {zoomChanged, centerChanged, loadData} from 'actions/map'
import mapStateToProps from 'selectors/map'
import {getLayerIds} from 'selectors/map/layers'
import {
    MountainInformationNetworkSubmission,
    WeatherStation,
} from 'api/schemas'
import {push} from 'utils/router'
import * as Layers from 'constants/map/layers'
import {near} from 'utils/geojson'
import mapbox from 'services/mapbox/map'

const EMPTY = new List()
function noop() {}

function isForecastRoute({path}) {
    return path === 'forecasts'
}
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

class Container extends Component {
    propTypes = {
        onLoad: PropTypes.func,
        onInitializationError: PropTypes.func,
    }
    static defaultProps = {
        onLoad: noop,
        onInitializationError: noop,
    }
    state = {
        bounds: null,
        map: null,
    }
    lastMouseMoveEvent = null
    zoomToBounds = false
    constructor(props) {
        super(props)

        this.popup = new mapbox.Popup()
    }
    get map() {
        return this.state.map
    }
    processMouseMove = () => {
        if (this.lastMouseMoveEvent === null || !this.map) {
            return
        }

        const canvas = this.map.getCanvas()
        const {point} = this.lastMouseMoveEvent
        const features = this.map.queryRenderedFeatures(point, {
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
        this.push(location)
    }
    handleMousemove = event => {
        if (this.map) {
            this.lastMouseMoveEvent = event
        }
    }
    handleMoveend = event => {
        // Inspired by https://www.mapbox.com/blog/mapbox-gl-js-reactive/
        if (event.originalEvent) {
            const center = event.target.getCenter().toArray()

            this.props.centerChanged(center)
        }
    }
    handleZoomend = event => {
        // Inspired by https://www.mapbox.com/blog/mapbox-gl-js-reactive/
        if (event.originalEvent) {
            const zoom = event.target.getZoom()

            this.props.zoomChanged(zoom)
        }
    }
    handleClick = event => {
        if (!this.map) {
            return
        }

        const {point} = event
        let features = null

        // Handle Mountain Information Network layers
        features = this.map.queryRenderedFeatures(point, {
            layers: getLayerIds(Layers.MOUNTAIN_INFORMATION_NETWORK)
        })

        if (features.length > 0) {
            const [feature] = features
            const key = MountainInformationNetworkSubmission.getKey()

            if (feature.properties.cluster) {
                const {properties: {point_count}} = feature
                const {data} = this.props.sources.find(({id}) => id === key)
                const submissions = near(feature, data, point_count)
                const coordinates = submissions.features.map(({geometry}) => geometry.coordinates)
                const longitudes = new Set(coordinates.map(c => c[0]))
                const latitudes = new Set(coordinates.map(c => c[1]))

                if (longitudes.size === 1 && latitudes.size === 1) {
                    this.showMINPopup(submissions.features)
                } else {
                    this.setBounds(submissions)
                }

                return
            } else {
                const {id} = feature.properties

                if (features.length > 1) {
                    this.showMINPopup(features)
                } else {
                    this.transitionToMIN(id)
                }

                return
            }
        }

        // Weather Stations
        features = this.map.queryRenderedFeatures(point, {
            layers: getLayerIds(Layers.WEATHER_STATION)
        })

        if (features.length > 0) {
            const [feature] = features
            const key = WeatherStation.getKey()

            if (feature.properties.cluster) {
                const {properties: {point_count}} = feature
                const {data} = this.props.sources.find(({id}) => id === key)

                return this.setBounds(near(feature, data, point_count))
            } else {
                return this.push({
                    query: {
                        panel: `${key}/${feature.properties.stationId}`
                    }
                }, this.props)
            }
        }

        // Handle Hot Zone Report layers
        features = this.map.queryRenderedFeatures(point, {
            layers: getLayerIds(Layers.HOT_ZONE_REPORTS)
        })

        if (features.length > 0) {
            const [feature] = features

            return this.push({
                pathname: `/map/hot-zone-reports/${feature.properties.id}`,
            }, this.props)
        }

        // Handle Forecast layers
        features = this.map.queryRenderedFeatures(point, {
            layers: getLayerIds(Layers.FORECASTS)
        })

        if (features.length > 0) {
            const [feature] = features

            return this.push({
                pathname: `/map/forecasts/${feature.properties.id}`,
            })
        }
    }
    showMINPopup(features) {
        const [{geometry: {coordinates}}] = features
        const html = document.createElement('div')
        const p = document.createElement('p')
        const ul = document.createElement('ul')

        p.textContent = `${features.length} reports are available at this location:`

        features.forEach(({properties: {id, title}}) => {
            const li = document.createElement('li')
            const a = document.createElement('a')

            a.href = '#'
            a.textContent = title
            a.onclick = event => {
                this.transitionToMIN(id)
            }

            li.appendChild(a)

            ul.appendChild(li)
        })

        html.appendChild(p)
        html.appendChild(ul)

        this.popup.setLngLat(coordinates).setDOMContent(html).addTo(this.map)
    }
    transitionToMIN(id) {
        return this.push({
            query: {
                panel: `${MountainInformationNetworkSubmission.getKey()}/${id}`
            }
        }, this.props)
    }
    push(location) {
        this.zoomToBounds = true

        push(location, this.props)
    }
    handleLoad = event => {
        const map = event.target

        this.setState({map}, () => {
            const {onLoad, routes, params} = this.props

            if (routes.find(isForecastRoute)) {
                this.setActiveForecastRegion(params.name)
            }

            onLoad(map)
        })
    }
    setForecastRegionsFilter(id = '') {
        if (!this.map) {
            return
        }

        this.map.setFilter('forecast-regions-contour-hover', ['==', 'id', id])
    }
    setActiveForecastRegion(name = '') {
        if (!this.map) {
            return
        }

        this.map.setFilter('forecast-regions-active', ['==', 'id', name])
        this.map.setFilter('forecast-regions-contour-active', ['==', 'id', name])
    }
    setBounds(feature, callback) {
        let bounds = null

        if (feature) {
            bounds = this.props.computeFitBounds(feature, false, false)
        }

        this.setState({bounds}, callback)
    }
    componentDidMount() {
        this.props.loadData()

        this.intervalID = setInterval(this.processMouseMove, 100)
    }
    componentWillUnmount() {
        clearInterval(this.intervalID)
    }
    shouldComponentUpdate({layers, sources, markers}, {map, bounds}) {
        if (layers === this.props.layers &&
            sources === this.props.sources &&
            markers === this.props.markers &&
            bounds === this.state.bounds &&
            map === this.state.map
        ) {
            return false
        }

        return true
    }
    componentWillReceiveProps({feature, routes, params, location, command}) {
        if (feature && this.props.feature !== feature && !this.zoomToBounds) {
            this.setBounds(feature)
        }

        if (location.key !== this.props.location.key) {
            this.zoomToBounds = false
        }

        if (routes.find(isForecastRoute)) {
            if (params.name !== this.props.params.name) {
                this.setActiveForecastRegion(params.name)
            }
        } else {
            this.setActiveForecastRegion()
        }

        if (this.map && command !== this.props.command) {
            this.map[command.name].apply(this.map, command.args)
        }
    }
    renderMarker = ({id, ...marker}) => {
        return <Marker key={id} {...marker} onClick={this.handleMarkerClick} />
    }
    renderMountainInformationNetworkMarker = ({id, ...marker}) => {
        return <Marker key={id} {...marker} onClick={this.handleMountainInformationNetworkMarkerClick} />
    }
    render() {
        const {map} = this
        const {bounds} = this.state
        const {
            sources = EMPTY,
            layers = EMPTY,
            markers = EMPTY,
            zoom,
            center,
            onInitializationError,
        } = this.props
        const events = {
            onMousemove: this.handleMousemove,
            onMoveend: this.handleMoveend,
            onZoomend: this.handleZoomend,
            onClick: this.handleClick,
            onLoad: this.handleLoad,
            onInitializationError,
        }

        return (
            <Map bounds={bounds} zoom={zoom} center={center} {...events}>
                {map && sources.map(renderSource)}
                {map && layers.map(renderLayer)}
                {map && markers.map(this.renderMarker)}
            </Map>
        )
    }
}

export default compose(
    getContext({
        location: PropTypes.object.isRequired,
        params: PropTypes.object.isRequired,
        routes: PropTypes.array.isRequired,
    }),
    withRouter,
    connect(mapStateToProps, {
        zoomChanged,
        centerChanged,
        loadData,
    }),
)(Container)
