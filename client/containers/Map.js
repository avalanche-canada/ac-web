import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import mapbox from 'services/mapbox/map'
import Url from 'url'
import { Map as Base, Marker } from 'components/map'
import {
    loadData,
    loadMapStyle,
    activeFeaturesChanged,
    mapWidthChanged,
} from 'actions/map'
import mapStateToProps from 'selectors/map'
import { LayerIds, allLayerIds } from 'constants/map/layers'
import { near } from 'utils/geojson'
import * as Schemas from 'api/schemas'
import * as Layers from 'constants/drawers'
import noop from 'lodash/noop'
import throttle from 'lodash/throttle'

const CLUSTER_DIST = 0.005

const LAYERS = [
    Layers.SPECIAL_INFORMATION,
    Layers.FATAL_ACCIDENT,
    Layers.MOUNTAIN_INFORMATION_NETWORK,
    Layers.MOUNTAIN_CONDITIONS_REPORTS,
    Layers.WEATHER_STATION,
    Layers.TOYOTA_TRUCK_REPORTS,
    Layers.HOT_ZONE_REPORTS,
    Layers.FORECASTS,
]

function createPrimaryPanelLocationFactory({ key }) {
    return id => ({
        pathname: `/map/${key}/${id}`,
    })
}

function createSecondayPanelLocationFactory(key) {
    if (typeof key === 'string') {
        return id => ({
            search: `?panel=${key}/${id}`,
        })
    }

    return createSecondayPanelLocationFactory(key.key)
}

const LOCATION_CREATORS = new Map([
    [
        Layers.SPECIAL_INFORMATION,
        createSecondayPanelLocationFactory('special-information'),
    ],
    [
        Layers.FATAL_ACCIDENT,
        createSecondayPanelLocationFactory('fatal-accident'),
    ],
    [
        Layers.MOUNTAIN_INFORMATION_NETWORK,
        createSecondayPanelLocationFactory(
            Schemas.MountainInformationNetworkSubmission
        ),
    ],
    [
        Layers.WEATHER_STATION,
        createSecondayPanelLocationFactory(Schemas.WeatherStation),
    ],
    [
        Layers.MOUNTAIN_CONDITIONS_REPORTS,
        createSecondayPanelLocationFactory(Schemas.MountainConditionsReport),
    ],
    [
        Layers.TOYOTA_TRUCK_REPORTS,
        createSecondayPanelLocationFactory('toyota-truck-reports'),
    ],
    [
        Layers.HOT_ZONE_REPORTS,
        createPrimaryPanelLocationFactory(Schemas.HotZoneReport),
    ],
    [Layers.FORECASTS, createPrimaryPanelLocationFactory(Schemas.Forecast)],
])

const CLUSTER_BOUNDS_OPTIONS = {
    padding: 75,
    speed: 1.75,
}

@withRouter
@connect(mapStateToProps, {
    loadData,
    loadMapStyle,
    activeFeaturesChanged,
    mapWidthChanged,
})
export default class Container extends Component {
    propTypes = {
        onLoad: PropTypes.func,
        onInitializationError: PropTypes.func,
        style: PropTypes.object,
        markers: PropTypes.arrayOf(PropTypes.object),
        bounds: PropTypes.object,
        command: PropTypes.string,
        computeFitBounds: PropTypes.func.isRequired,
        loadMapStyle: PropTypes.func.isRequired,
        loadData: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        activeFeaturesChanged: PropTypes.func.isRequired,
        mapWidthChanged: PropTypes.func.isRequired,
    }
    static defaultProps = {
        onLoad: noop,
        onInitializationError: noop,
        style: null,
    }
    map = null
    isInternalNavigation = false
    lastMouseMoveEvent = null
    processMouseMove = () => {
        if (this.lastMouseMoveEvent === null || !this.map) {
            return
        }

        const canvas = this.map.getCanvas()
        const { point } = this.lastMouseMoveEvent
        const features = this.map.queryRenderedFeatures(point, {
            layers: allLayerIds,
        })

        canvas.style.cursor = features.length ? 'pointer' : null

        const [feature] = features

        if (feature && feature.properties) {
            const { title, name } = feature.properties

            if (name || title) {
                canvas.setAttribute('title', name || title)
            } else {
                canvas.removeAttribute('title')
            }
        }

        this.lastMouseMoveEvent = null
    }
    handleMarkerClick = ({ location }, event) => {
        event.stopPropagation()
        this.push(location)
    }
    handleMousemove = event => {
        if (this.map) {
            this.lastMouseMoveEvent = event
        }
    }
    handleClick = ({ point }) => {
        if (!this.map) {
            return
        }

        // TODO: Only use the visible layers, actually, it is not working, need to respect an order!
        for (const layer of LAYERS) {
            const features = this.map.queryRenderedFeatures(point, {
                layers: LayerIds.get(layer),
            })

            if (typeof features !== 'undefined' && features.length > 0) {
                const [feature] = features

                if (feature.properties.cluster) {
                    const { point_count } = feature.properties
                    const { data } = this.map
                        .getSource(feature.layer.source)
                        .serialize()
                    const cluster = near(feature, data, point_count)
                    const coordinates = cluster.features.map(
                        feature => feature.geometry.coordinates
                    )
                    const longitudes = coordinates.map(c => c[0])
                    const latitudes = coordinates.map(c => c[1])

                    const long_diff =
                        Math.max.apply(Math, longitudes) -
                        Math.min.apply(Math, longitudes)
                    const lat_diff =
                        Math.max.apply(Math, latitudes) -
                        Math.min.apply(Math, latitudes)

                    if (long_diff < CLUSTER_DIST && lat_diff < CLUSTER_DIST) {
                        this.showClusterPopup(layer, cluster.features)
                    } else {
                        this.fitBounds(cluster, CLUSTER_BOUNDS_OPTIONS)
                    }

                    return
                } else {
                    const uniqueFeatures = Array.from(
                        features
                            .filter(feature => !feature.properties.cluster)
                            .reduce((features, feature) => {
                                features.set(feature.id, feature)

                                return features
                            }, new Map())
                            .values()
                    )

                    if (uniqueFeatures.length > 1) {
                        this.showClusterPopup(layer, uniqueFeatures)
                    } else {
                        this.transitionToFeature(layer, feature.properties.id)
                    }

                    return
                }
            }
        }
    }
    showClusterPopup(layer, features) {
        const [{ geometry: { coordinates } }] = features
        const html = document.createElement('div')
        const p = document.createElement('p')
        const ul = document.createElement('ul')

        p.textContent = `${
            features.length
        } reports are available at this location:`

        features.forEach(({ properties: { id, name, title } }) => {
            const li = document.createElement('li')
            const a = document.createElement('a')

            a.href = '#'
            a.textContent = title || name
            a.onclick = () => {
                this.transitionToFeature(layer, id)
            }

            li.appendChild(a)

            ul.appendChild(li)
        })

        html.appendChild(p)
        html.appendChild(ul)

        this.popup
            .setLngLat(coordinates)
            .setDOMContent(html)
            .addTo(this.map)
    }
    transitionToFeature(layer, id) {
        const createLocation = LOCATION_CREATORS.get(layer)
        const location = createLocation(id)

        return this.push(location)
    }
    push(location) {
        this.isInternalNavigation = true

        this.props.history.push({
            ...this.props.location,
            ...location,
        })
    }
    handleLoad = event => {
        const map = event.target
        const { bounds } = this.props

        map.on('mousemove', this.handleMousemove)
        map.on('click', this.handleClick)

        if (bounds) {
            map.fitBounds(bounds.bbox, bounds.options)
        }

        this.map = map

        this.forceUpdate(() => {
            this.props.onLoad(map)
        })
    }
    fitBounds(feature, options) {
        if (!feature) {
            return
        }

        const bounds = this.props.computeFitBounds(
            feature,
            false,
            false,
            options
        )

        this.map.fitBounds(bounds.bbox, bounds.options)
    }
    createActiveFeatures() {
        const { location, match, activeFeaturesChanged } = this.props
        const { panel } = Url.parse(location.search)
        const { type, name } = match.params
        const features = []

        if (panel) {
            features.push(panel.split('/'))
        }

        if (name) {
            features.push([RouteSchemaMapping.get(type), name])
        }

        activeFeaturesChanged(new Map(features))
    }
    handleWindowWidthChange = throttle(() => {
        this.props.mapWidthChanged(window.innerWidth)
    }, 500)
    componentDidMount() {
        this.props.loadMapStyle('citxsc95s00a22inxvbydbc89')
        this.props.loadData()
        this.props.mapWidthChanged(window.innerWidth)
        this.createActiveFeatures()

        this.intervalID = setInterval(this.processMouseMove, 100)
        this.popup = new mapbox.Popup()
        window.addEventListener('resize', this.handleWindowWidthChange, false)
        window.addEventListener(
            'orientationchange',
            this.handleWindowWidthChange,
            false
        )
    }
    componentWillUnmount() {
        clearInterval(this.intervalID)
        window.removeEventListener('resize', this.handleWindowWidthChange)
        window.removeEventListener(
            'orientationchange',
            this.handleWindowWidthChange
        )
    }
    shouldComponentUpdate({ markers, style }) {
        if (markers !== this.props.markers || style !== this.props.style) {
            return true
        }

        return false
    }
    componentWillReceiveProps({ bounds, command }) {
        if (
            bounds &&
            this.map &&
            this.props.bounds !== bounds &&
            this.isInternalNavigation !== true
        ) {
            this.map.fitBounds(bounds.bbox, bounds.options)
        }

        if (this.map && command !== this.props.command) {
            this.map[command.name].apply(this.map, command.args)
        }
    }
    componentDidUpdate({ location }) {
        if (location !== this.props.location) {
            this.createActiveFeatures()
        }
    }
    renderMarker = ({ id, ...marker }) => {
        return <Marker key={id} {...marker} onClick={this.handleMarkerClick} />
    }
    render() {
        const { markers, onInitializationError, style } = this.props
        const events = {
            onLoad: this.handleLoad,
            onInitializationError,
        }

        return (
            <Base style={style} {...events}>
                {this.map && markers.map(this.renderMarker)}
            </Base>
        )
    }
}

const RouteSchemaMapping = new Map([
    [Schemas.Forecast.key, Schemas.ForecastRegion.key],
    [Schemas.HotZoneReport.key, Schemas.HotZone.key],
])
