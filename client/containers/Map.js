import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getCoord } from '@turf/invariant'
import bbox from '@turf/bbox'
import noop from 'lodash/noop'
import mapbox from 'services/mapbox/map'
import Url from 'url'
import { Map as Base, Marker, NavigationControl } from 'components/map'
import { loadData, loadMapStyle, activeFeaturesChanged } from 'actions/map'
import mapStateToProps from 'selectors/map'
import { LayerIds, allLayerIds } from 'constants/map/layers'
import { near } from 'utils/geojson'
import * as Schemas from 'api/schemas'
import * as Layers from 'constants/drawers'

const CLUSTER_DIST = 0.005

const LAYERS = [
    Layers.SPECIAL_INFORMATION,
    Layers.FATAL_ACCIDENT,
    Layers.MOUNTAIN_CONDITIONS_REPORTS,
    Layers.MOUNTAIN_INFORMATION_NETWORK,
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
})
export default class Container extends Component {
    propTypes = {
        onLoad: PropTypes.func,
        onError: PropTypes.func,
        style: PropTypes.object,
        markers: PropTypes.arrayOf(PropTypes.object),
        loadMapStyle: PropTypes.func.isRequired,
        loadData: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        activeFeaturesChanged: PropTypes.func.isRequired,
    }
    static defaultProps = {
        onLoad: noop,
        onError: noop,
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
    handleClick = ({ point, lngLat }) => {
        if (!this.map) {
            return
        }

        // TODO: Only use the visible layers, actually, it is not working, need to respect an order!
        for (const layer of LAYERS) {
            const features = this.map.queryRenderedFeatures(point, {
                layers: LayerIds.get(layer),
            })

            if (Array.isArray(features) && features.length > 0) {
                const [feature] = features

                if (feature.properties.cluster) {
                    const { point_count } = feature.properties
                    const { data } = this.map
                        .getSource(feature.layer.source)
                        .serialize()
                    const cluster = near(feature, data, point_count)
                    const coordinates = cluster.features.map(getCoord)
                    const longitudes = coordinates.map(c => c[0])
                    const latitudes = coordinates.map(c => c[1])

                    const longDiff =
                        Math.max(...longitudes) - Math.min(...longitudes)
                    const latDiff =
                        Math.max(...latitudes) - Math.min(...latitudes)

                    if (longDiff < CLUSTER_DIST && latDiff < CLUSTER_DIST) {
                        this.showClusterPopup(layer, cluster.features, lngLat)
                    } else {
                        const box = bbox(cluster)

                        this.map.fitBounds(
                            [[box[0], box[1]], [box[2], box[3]]],
                            CLUSTER_BOUNDS_OPTIONS
                        )
                    }

                    return
                } else {
                    const ids = new Set(
                        features
                            .filter(feature => !feature.properties.cluster)
                            .map(feature => feature.properties.id)
                    )

                    if (ids.size > 1) {
                        this.showClusterPopup(
                            layer,
                            Array.from(ids).map(id =>
                                features.find(
                                    feature => feature.properties.id === id
                                )
                            ),
                            lngLat
                        )
                    } else {
                        this.transitionToFeature(layer, feature.properties.id)
                    }

                    return
                }
            }
        }
    }
    showClusterPopup(layer, features, lngLat) {
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
            .setLngLat(lngLat)
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

        map.on('mousemove', this.handleMousemove)
        map.on('click', this.handleClick)

        this.map = map

        this.forceUpdate(() => {
            this.props.onLoad(event)
        })
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
    componentDidMount() {
        this.props.loadMapStyle('citxsc95s00a22inxvbydbc89')
        this.props.loadData()
        this.createActiveFeatures()

        this.intervalID = setInterval(this.processMouseMove, 100)
        this.popup = new mapbox.Popup()
    }
    componentWillUnmount() {
        clearInterval(this.intervalID)
    }
    shouldComponentUpdate({ markers, style }) {
        if (markers !== this.props.markers || style !== this.props.style) {
            return true
        }

        return false
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
        const { markers, style, onError } = this.props

        return (
            <Base style={style} onLoad={this.handleLoad} onError={onError}>
                {this.map && markers.map(this.renderMarker)}
                <NavigationControl />
            </Base>
        )
    }
}

const RouteSchemaMapping = new Map([
    [Schemas.Forecast.key, Schemas.ForecastRegion.key],
    [Schemas.HotZoneReport.key, Schemas.HotZone.key],
])
