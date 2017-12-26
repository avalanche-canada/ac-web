import React, { Component } from 'react'
import styles from './TripPlanner.css'
import Map from './Map'
import { Marker } from 'components/map'
import Welcome from './panels/Welcome'
import Area from './panels/Area'
import Forecast from './panels/Forecast'
import Options from './panels/Options'
import throttle from 'lodash/throttle'
import place from 'components/icons/place.svg'
import mapbox from 'services/mapbox/map'
import bbox from '@turf/bbox'
import Device from 'components/Device'

export default class TripPlannerLayout extends Component {
    state = {
        location: null,
        area: null,
        region: null,
        showPopup: true,
    }
    componentDidMount() {
        this.popup = new mapbox.Popup({
            closeButton: false,
            offset: [0, -10],
        })
        this.element = Object.assign(document.createElement('img'), {
            src: place,
        })
    }
    handleForecastSelect = region => this.setState({ region })
    handleLoad = event => {
        const map = event.target
        const container = map.getContainer()

        map.on('click', this.handleClick)
        map.on('mousemove', this.handleMousemove)
        container.addEventListener('mouseleave', this.handleMouseleave, false)

        this.map = map
    }
    handleClick = event => {
        const { lngLat, point } = event
        const [area] = this.queryAreas(point)
        const [region] = this.queryRegions(point)

        this.setState({ area, location: lngLat, region })
    }
    handleMouseleave = () => {
        this.popup.remove()
    }
    handleMousemove = throttle(event => {
        if (!this.state.showPopup) {
            return null
        }

        const { target, point, lngLat } = event
        const [area] = this.queryAreas(point)
        const [region] = this.queryRegions(point)

        const node =
            area || region ? window.document.createElement('div') : null

        if (area) {
            const name = window.document.createElement('b')
            const rating = window.document.createElement('div')
            const {
                ATES_RECREATION_BNDRY_NAME,
                ATES_ZONE_CLASS_DESCRIPTION,
            } = area.properties

            name.innerText = `ATES area: ${ATES_RECREATION_BNDRY_NAME}`
            rating.innerText = `${ATES_ZONE_CLASS_DESCRIPTION} terrain`

            node.appendChild(name)
            node.appendChild(rating)
        }

        if (region) {
            const name = window.document.createElement('b')

            name.innerText = `Forecast region: ${region.properties.name}`

            node.appendChild(name)
        }

        if (node) {
            const info = window.document.createElement('div')

            info.innerText = 'Click to start your planning'
            node.appendChild(info)

            this.popup.setLngLat(lngLat).setDOMContent(node)

            if (!this.popup.isOpen()) {
                this.popup.addTo(target)
            }
        } else {
            this.popup.remove()
        }
    }, 150)
    fitBounds = geometry => {
        this.map.fitBounds(bbox(geometry), {
            padding: 25,
        })
    }
    queryAreas(point) {
        return this.map.queryRenderedFeatures(point, {
            layers: ['ates-terrain'],
        })
    }
    queryRegions(point) {
        return this.map.queryRenderedFeatures(point, {
            layers: ['forecast-regions', 'forecast-regions-contours'],
        })
    }
    get marker() {
        const { location } = this.state

        return location ? (
            <Marker lngLat={location} element={this.element} />
        ) : null
    }
    get forecast() {
        const { region } = this.state

        return region ? (
            <Forecast
                onLocateClick={this.fitBounds}
                name={region.properties.id}
            />
        ) : null
    }
    get area() {
        const { area } = this.state

        if (!area) {
            return null
        }
        const {
            ATES_RECREATION_BNDRY_NAME,
            ATES_ZONE_CLASS_DESCRIPTION,
        } = area.properties

        return (
            <Area
                name={ATES_RECREATION_BNDRY_NAME}
                rating={ATES_ZONE_CLASS_DESCRIPTION}
            />
        )
    }
    get welcome() {
        const { area, region } = this.state

        return <Welcome closable={area || region} />
    }
    get options() {
        return (
            <Device>
                {({ isTouchable }) =>
                    isTouchable ? null : (
                        <Options>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={this.state.showPopup}
                                    onChange={this.handleShowPopupChange}
                                />{' '}
                                Show popup when you move your mouse over the map
                            </label>
                        </Options>
                    )
                }
            </Device>
        )
    }
    handleShowPopupChange = () => {
        this.setState(state => ({
            showPopup: !state.showPopup,
        }))
    }
    render() {
        return (
            <div className={styles.Layout}>
                <Map onLoad={this.handleLoad}>{this.marker}</Map>
                <div className={styles.Sidebar}>
                    {this.welcome}
                    {this.forecast}
                    {this.area}
                    {this.options}
                </div>
            </div>
        )
    }
}
