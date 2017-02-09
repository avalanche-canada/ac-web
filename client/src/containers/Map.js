import React, {PropTypes, Component} from 'react'
import {compose, lifecycle, onlyUpdateForKeys, withProps, withHandlers, withState, getContext} from 'recompose'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import mapbox from 'services/mapbox/map'
import {Map, Source, Layer, Marker} from 'components/map'
import {loadData, loadMapStyle} from 'actions/map'
import mapStateToProps from 'selectors/map'
import {LayerIds, allLayerIds} from 'constants/map/layers'
import {push} from 'utils/router'
import {near} from 'utils/geojson'
import * as Schemas from 'api/schemas'
import * as Layers from 'constants/drawers'
import noop from 'lodash/noop'
import nearest from '@turf/nearest'

const CLUSTER_BOUNDS_OPTIONS = {
    padding: 75,
    speed: 1.75,
}

class Container extends Component {
    propTypes = {
        onLoad: PropTypes.func,
        onInitializationError: PropTypes.func,
        style: PropTypes.object,
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
        const {point} = this.lastMouseMoveEvent
        const features = this.map.queryRenderedFeatures(point, {
            layers: allLayerIds
        })

        canvas.style.cursor = features.length ? 'pointer' : null

        const [feature] = features

        if (feature && feature.properties) {
            const {id, title, name} = feature.properties

            if (name || title) {
                canvas.setAttribute('title', name || title)
            } else {
                canvas.removeAttribute('title')
            }
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
    handleClick = event => {
        if (!this.map) {
            return
        }

        const {point} = event
        let features = null

        // TODO: Find a way, so everytime I add a layer, I do not have to touch that method

        // Special Information
        features = this.map.queryRenderedFeatures(point, {
            layers: LayerIds.get(Layers.SPECIAL_INFORMATION)
        })

        if (features.length > 0) {
            let [feature] = features

            if (feature.properties.cluster) {
                const {data} = this.map.getSource(feature.layer.source).serialize()

                feature = nearest(feature, data)
            }

            const panel = `special-information/${feature.properties.id}`

            return push({
                query: {
                    panel
                }
            }, this.props)
        }

        // Handle Mountain Information Network layers
        features = this.map.queryRenderedFeatures(point, {
            layers: LayerIds.get(Layers.MOUNTAIN_INFORMATION_NETWORK)
        })

        if (features.length > 0) {
            const [feature] = features

            if (feature.properties.cluster) {
                const {point_count} = feature.properties
                const {data} = this.map.getSource(Layers.MOUNTAIN_INFORMATION_NETWORK).serialize()
                const submissions = near(feature, data, point_count)
                const coordinates = submissions.features.map(({geometry}) => geometry.coordinates)
                const longitudes = new Set(coordinates.map(c => c[0]))
                const latitudes = new Set(coordinates.map(c => c[1]))

                if (longitudes.size === 1 && latitudes.size === 1) {
                    this.showMINPopup(submissions.features)
                } else {
                    this.fitBounds(submissions, CLUSTER_BOUNDS_OPTIONS)
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
            layers: LayerIds.get(Layers.WEATHER_STATION)
        })

        if (features.length > 0) {
            const [feature] = features

            if (feature.properties.cluster) {
                const {point_count} = feature.properties
                const {data} = this.map.getSource(Layers.WEATHER_STATION).serialize()
                const stations = near(feature, data, point_count)

                return this.fitBounds(stations, CLUSTER_BOUNDS_OPTIONS)
            } else {
                const {key} = Schemas.WeatherStation

                return this.push({
                    query: {
                        panel: `${key}/${feature.properties.id}`
                    }
                }, this.props)
            }
        }

        // Toyota truck reports
        features = this.map.queryRenderedFeatures(point, {
            layers: LayerIds.get(Layers.TOYOTA_TRUCK_REPORTS)
        })

        if (features.length > 0) {
            const [feature] = features
            const panel = `toyota-truck-reports/${feature.properties.id}`

            return push({
                query: {
                    panel
                }
            }, this.props)
        }

        // Handle Hot Zone Report layers
        features = this.map.queryRenderedFeatures(point, {
            layers: LayerIds.get(Layers.HOT_ZONE_REPORTS)
        })

        if (features.length > 0) {
            const [feature] = features

            return this.push({
                pathname: `/map/hot-zone-reports/${feature.properties.id}`,
            }, this.props)
        }

        // Handle Forecast layers
        features = this.map.queryRenderedFeatures(point, {
            layers: LayerIds.get(Layers.FORECASTS)
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
                panel: `${Schemas.MountainInformationNetworkSubmission.key}/${id}`
            }
        }, this.props)
    }
    push(location) {
        this.isInternalNavigation = true

        push(location, this.props)
    }
    handleLoad = event => {
        const map = event.target
        const {bounds} = this.props

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

        const bounds = this.props.computeFitBounds(feature, false, false, options)

        this.map.fitBounds(bounds.bbox, bounds.options)
    }
    componentDidMount() {
        this.props.loadMapStyle('citxsc95s00a22inxvbydbc89')
        this.props.loadData()

        this.intervalID = setInterval(this.processMouseMove, 100)
        this.popup = new mapbox.Popup()
    }
    componentWillUnmount() {
        clearInterval(this.intervalID)
    }
    shouldComponentUpdate({markers, style}) {
        if (markers !== this.props.markers ||
            style !== this.props.style
        ) {
            return true
        }

        return false
    }
    componentWillReceiveProps({bounds, command, location}) {
        if (bounds && this.map && this.props.bounds !== bounds && this.isInternalNavigation !== true) {
            this.map.fitBounds(bounds.bbox, bounds.options)
        }

        if (this.map && command !== this.props.command) {
            this.map[command.name].apply(this.map, command.args)
        }
    }
    renderMarker = ({id, ...marker}) => {
        return <Marker key={id} {...marker} onClick={this.handleMarkerClick} />
    }
    render() {
        const {markers, onInitializationError, style} = this.props
        const events = {
            onLoad: this.handleLoad,
            onInitializationError,
        }

        return (
            <Map style={style} {...events}>
                {this.map && markers.map(this.renderMarker)}
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
        loadData,
        loadMapStyle,
    }),
)(Container)
