import React, { Component, PureComponent, Fragment, createRef } from 'react'
import PropTypes from 'prop-types'
import { Link, Match } from '@reach/router'
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

export default class Main extends Component {
    static propTypes = {
        navigate: PropTypes.func.isRequired,
        location: PropTypes.object.isRequired,
    }
    state = {
        hasError: false,
        width: Math.min(MAX_DRAWER_WIDTH, window.innerWidth),
    }
    supported = supported()
    primary = createRef()
    secondary = createRef()
    flyTo() {}
    fitBounds() {}
    getSource() {}
    get offset() {
        const { width } = this.state
        let x = 0

        if (this.primary?.current?.opened) {
            x -= width / 2
        }

        if (this.secondary?.current?.opened) {
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
                    speed: 2.5,
                })
            },
            getSource(id) {
                return target.getSource(id)
            },
        })

        target.on('resize', this.handleResize)
    }
    handleFeatureClick = feature => {
        const { properties } = feature

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
            let { pathname, search } = this.props.location
            const { type, id } = properties

            if (PATHS.has(type)) {
                pathname = `${PATHS.get(type)}/${id}`
            }

            if (SEARCHS.has(type)) {
                search = `?panel=${SEARCHS.get(type)}/${id}`
            }

            this.props.navigate(pathname + search)
        }
    }
    handleMarkerClick = id => {
        const { location } = this.props
        const path = `/${PATHS.get(TYPES.FORECASTS)}/${id}`

        this.props.navigate(uri + path + location.search)
    }
    handleResize = event => {
        const { clientWidth } = event.target.getContainer()

        this.setState({
            width: Math.min(MAX_DRAWER_WIDTH, clientWidth),
        })
    }
    handleLocateClick = ({ geometry }) => {
        if (geometry.type === 'Point') {
            this.flyTo(geometry.coordinates)
        } else {
            this.fitBounds(geometry)
        }
    }
    openExternalForecast = ({ match }) => {
        if (match) {
            const { name } = match

            if (externals.has(name)) {
                const { location, navigate } = this.props

                open(name)

                navigate(location.search)
            }
        }

        return null
    }
    handlePrimaryCloseClick = () => {
        const { navigate, location } = this.props

        navigate(location.search)
    }
    handleSecondaryCloseClick = () => {
        const { navigate, location } = this.props

        navigate(location.pathname)
    }
    render() {
        if (!this.supported) {
            return <UnsupportedMap />
        }

        const { width, hasError } = this.state

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
                        <Primary
                            ref={this.primary}
                            width={width}
                            onLocateClick={this.handleLocateClick}
                            onCloseClick={this.handlePrimaryCloseClick}
                        />
                        <Secondary
                            ref={this.secondary}
                            width={width}
                            onLocateClick={this.handleLocateClick}
                            onCloseClick={this.handleSecondaryCloseClick}
                        />
                        <Menu />
                        <ToggleMenu />
                        <LinkControlSet>
                            {hasError && <ErrorIndicator />}
                        </LinkControlSet>
                        <Match path="forecasts/:name">
                            {this.openExternalForecast}
                        </Match>
                    </div>
                </menu.Provider>
            </layers.Provider>
        )
    }
}

class LinkControlSet extends PureComponent {
    get tooltips() {
        const style = {
            maxWidth: 175,
            padding: '0.25em',
        }

        return [
            <div style={style}>
                Create a Mountain Information Network (MIN) report
            </div>,
            <div style={{ ...style, maxWidth: 125 }}>
                Visit the Mountain Weather Forecast
            </div>,
        ]
    }
    get links() {
        return [
            <Link
                className={styles['LinkControlSet--MIN']}
                to="mountain-information-network/submit"
            />,
            <Link className={styles['LinkControlSet--Weather']} to="weather" />,
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
