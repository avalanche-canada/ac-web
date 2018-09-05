import React, { PureComponent, Fragment } from 'react'
import { Link, Route, Redirect } from 'react-router-dom'
import supported from '@mapbox/mapbox-gl-supported'
import bbox from '@turf/bbox'
import * as turf from '@turf/helpers'
import StaticComponent from 'components/StaticComponent'
import Base from './Map'
import UnsupportedMap from './UnsupportedMap'
import { Wrapper } from 'components/tooltip'
import Device from 'components/Device'
import { captureException } from 'services/raven'
import { Warning } from 'components/icons'
import Primary from './Primary'
import Secondary from './Secondary'
import { Menu, ToggleMenu } from './drawers'
import externals, { open } from 'router/externals'
import * as menu from 'contexts/menu'
import * as layers from 'contexts/layers'
import * as TYPES from 'constants/drawers'
import styles from './Map.css'

const MAX_DRAWER_WIDTH = 500

export default class Layout extends PureComponent {
    state = {
        hasError: false,
        width: Math.min(MAX_DRAWER_WIDTH, window.innerWidth),
    }
    flyTo() {}
    fitBounds() {}
    getSource() {}
    get offset() {
        const { primary, secondary, width } = this.state
        let x = 0

        if (primary) {
            x -= width / 2
        }
        if (secondary) {
            x += width / 2
        }

        return [x, 0]
    }
    handleError = error => {
        this.setState({ hasError: true }, () => {
            captureException(error)
        })
    }
    handleLoad = ({ target }) => {
        Object.assign(this, {
            flyTo(center) {
                target.flyTo({
                    center,
                    zoom: 13,
                    offset: this.offset,
                })
            },
            fitBounds(geometry) {
                target.fitBounds(bbox(geometry), {
                    offset: this.offset,
                    padding: 75,
                    speed: 1.75,
                })
            },
            getSource(...args) {
                return target.getSource(...args)
            },
        })

        target.on('resize', this.handleResize)
    }
    handleFeatureClick = feature => {
        const { source, id, properties } = feature

        if (properties.cluster) {
            const source = this.getSource(feature.source)

            source.getClusterLeaves(
                feature.properties.cluster_id,
                null,
                null,
                (error, features) => {
                    if (error) {
                        return
                    }

                    this.fitBounds(turf.featureCollection(features))
                }
            )
        } else {
            let { search, pathname } = this.props.location

            if (PATHS.has(source)) {
                pathname = `/map/${PATHS.get(source)}/${id || properties.id}`
            }

            if (SEARCHS.has(source)) {
                search = `?panel=${SEARCHS.get(source)}/${id || properties.id}`
            }

            this.props.history.push({ search, pathname })
        }
    }
    handleMarkerClick = id => {
        this.props.history.push({
            ...this.props.location,
            pathname: `/map/${PATHS.get(TYPES.FORECASTS)}/${id}`,
        })
    }
    handleResize = event => {
        const { clientWidth } = event.target.getContainer()

        this.setState({
            width: Math.min(MAX_DRAWER_WIDTH, clientWidth),
        })
    }
    handleLocateClick = geometry => {
        if (geometry.type === 'Point') {
            this.flyTo(geometry.coordinates)
        } else {
            this.fitBounds(geometry)
        }
    }
    openExternalForecast({ match }) {
        const { name } = match.params

        if (externals.has(name)) {
            open(name)

            return <Redirect to="/map" />
        }

        return null
    }
    primary = props => {
        return (
            <Primary
                {...props}
                width={this.state.width}
                onLocateClick={this.handleLocateClick}
            />
        )
    }
    secondary = props => {
        return (
            <Secondary
                {...props}
                width={this.state.width}
                onLocateClick={this.handleLocateClick}
            />
        )
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
    render() {
        if (supported()) {
            return (
                <layers.Provider>
                    <menu.Provider>
                        <div className={styles.Layout}>
                            <Base
                                onError={this.handleError}
                                onLoad={this.handleLoad}
                                onFeatureClick={this.handleFeatureClick}
                                onMarkerClick={this.handleMarkerClick}
                            />
                            <Route
                                path="/map/forecasts/:name"
                                render={this.openExternalForecast}
                            />
                            <Route path="/map/:type/:name">
                                {this.primary}
                            </Route>
                            <Route path="/map*">{this.secondary}</Route>
                            <Menu />
                            <ToggleMenu />
                            <LinkControlSet>
                                {this.state.hasError && <ErrorIndicator />}
                            </LinkControlSet>
                        </div>
                    </menu.Provider>
                </layers.Provider>
            )
        }

        return <UnsupportedMap />
    }
}

class LinkControlSet extends PureComponent {
    get tooltips() {
        const style = {
            maxWidth: 175,
            padding: '0.25em',
        }

        return [
            <div key="min" style={style}>
                Create a Mountain Information Network (MIN) report
            </div>,
            <div key="mwf" style={{ ...style, maxWidth: 125 }}>
                Visit the Mountain Weather Forecast
            </div>,
        ]
    }
    get links() {
        return [
            <Link
                key="min"
                className={styles['LinkControlSet--MIN']}
                to="/mountain-information-network/submit"
            />,
            <Link
                key="mwf"
                className={styles['LinkControlSet--Weather']}
                to="/weather"
            />,
        ]
    }
    renderer = ({ isTouchable }) => {
        if (isTouchable) {
            return <Fragment>{this.links}</Fragment>
        }

        const { tooltips } = this

        return (
            <Fragment>
                {this.links.map((link, index) => (
                    <Wrapper
                        key={index}
                        tooltip={tooltips[index]}
                        placement="right">
                        {link}
                    </Wrapper>
                ))}
            </Fragment>
        )
    }
    render() {
        return (
            <div className={styles.LinkControlSet}>
                <Device>{this.renderer}</Device>
                {this.props.children}
            </div>
        )
    }
}

class ErrorIndicator extends StaticComponent {
    reload() {
        window.location.reload(true)
    }
    get tooltip() {
        const style = {
            padding: '0.25em',
            maxWidth: 225,
        }

        return (
            <div style={style}>
                An error happened while initializing the map. Therefore, some
                functionnalities might not be available.
                <br />
                <Device>
                    {({ isTouchable }) =>
                        `${isTouchable ? 'Tap' : 'Click'} to reload the map.`
                    }
                </Device>
            </div>
        )
    }
    render() {
        return (
            <Wrapper tooltip={this.tooltip}>
                <button onClick={this.reload} className={styles.Error}>
                    <Warning inverse />
                </button>
            </Wrapper>
        )
    }
}

// Constants
const PATHS = new Map([
    [TYPES.HOT_ZONE_REPORTS, 'hot-zone-reports'],
    [TYPES.FORECASTS, 'forecasts'],
])
const SEARCHS = new Map([
    [TYPES.WEATHER_STATION, 'weather-stations'],
    [
        TYPES.MOUNTAIN_INFORMATION_NETWORK,
        'mountain-information-network-submissions',
    ],
    [TYPES.FATAL_ACCIDENT, 'fatal-accidents'],
    [TYPES.SPECIAL_INFORMATION, 'special-information'],
    [TYPES.MOUNTAIN_CONDITIONS_REPORTS, 'mountain-conditions-reports'],
    [TYPES.TOYOTA_TRUCK_REPORTS, 'toyota-truck-reports'],
])
