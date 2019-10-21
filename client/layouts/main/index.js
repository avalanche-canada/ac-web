import React, { Component, Fragment, createRef } from 'react'
import PropTypes from 'prop-types'
import { Link, Match } from '@reach/router'
import { supported } from 'utils/mapbox'
import bbox from '@turf/bbox'
import Base from './Map'
import UnsupportedMap from './UnsupportedMap'
import { Warning } from 'components/icons'
import Primary from './Primary'
import Secondary from './Secondary'
import { Menu, ToggleMenu } from './drawers'
import externals, { open } from 'router/externals'
import { Provider as MenuProvider } from 'contexts/menu'
import { Provider as LayersProvider } from 'contexts/layers'
import { Provider as MapStateProvider, useMapState } from 'contexts/map/state'
import * as TYPES from 'constants/drawers'
import { isTouchable } from 'utils/device'
import { pluralize } from 'utils/string'
import keycodes from 'constants/keycodes'
import { useBoolean, useEventListener } from 'hooks'
import Dialog, { Header, Footer, Body } from 'components/dialog'
import { Close } from 'components/button'
import Button from 'components/button'
import { Error } from 'components/text'
import Shim from 'components/Shim'

import styles from './Map.css'

const MAX_DRAWER_WIDTH = 500

export default class Main extends Component {
    static propTypes = {
        navigate: PropTypes.func.isRequired,
        location: PropTypes.object.isRequired,
    }
    state = {
        width: Math.min(MAX_DRAWER_WIDTH, window.innerWidth),
    }
    primary = createRef()
    secondary = createRef()
    flyTo() {}
    fitBounds() {}
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
    withMap = map => {
        Object.assign(this, {
            flyTo(center, zoom = 13) {
                const { offset } = this

                map.flyTo({ center, zoom, offset })
            },
            fitBounds(geometry) {
                map.fitBounds(bbox(geometry), {
                    offset: this.offset,
                    padding: 75,
                    speed: 2.5,
                })
            },
        })

        map.on('resize', this.handleResize)
        map.on('click', event => {
            const [feature] = map.queryRenderedFeatures(event.point)

            if (!feature) {
                return
            }

            const { properties, geometry } = feature

            if (properties.cluster) {
                const source = map.getSource(feature.source)

                source.getClusterExpansionZoom(
                    properties.cluster_id,
                    (error, zoom) => {
                        if (error) {
                            return // We do not really care if there is an error
                        }

                        this.flyTo(geometry.coordinates, zoom)
                    }
                )
            } else {
                this.handleFeatureClick(feature)
            }
        })
    }
    handleFeatureClick({ properties, source }) {
        const { location, navigate } = this.props
        const { id } = properties

        if (source === TYPES.FORECASTS && externals.has(id)) {
            open(id)
            return
        }

        let { pathname, search } = location

        if (PATHS.has(source)) {
            pathname = `${PATHS.get(source)}/${id}`
        }

        if (SEARCHS.has(source)) {
            search = `?panel=${SEARCHS.get(source)}/${id}`
        }

        navigate(pathname + search)
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
        if (!supported()) {
            return <UnsupportedMap />
        }

        const { width } = this.state

        return (
            <LayersProvider>
                <MenuProvider>
                    <MapStateProvider>
                        <div className={styles.Layout}>
                            <Base ref={this.withMap} />
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
                            <LinkControlSet />
                            <Match path="forecasts/:name">
                                {this.openExternalForecast}
                            </Match>
                        </div>
                    </MapStateProvider>
                </MenuProvider>
            </LayersProvider>
        )
    }
}

function LinkControlSet() {
    return (
        <div className={styles.LinkControlSet}>
            <Link
                className={styles['LinkControlSet--MIN']}
                to="/submit"
                data-tooltip="Create a Mountain Information&#xa;Network (MIN) report"
                data-tooltip-placement="right"
            />
            <Link
                className={styles['LinkControlSet--Weather']}
                to="/weather"
                data-tooltip="Visit the Mountain&#xa;Weather Forecast"
                data-tooltip-placement="right"
            />
            <ErrorIndicator />
        </div>
    )
}

function ErrorIndicator() {
    const [opened, open, close] = useBoolean(true)
    const { errors } = useMapState()
    const { size } = errors

    if (size === 0) {
        return null
    }

    const message = [
        pluralize('error', size, true),
        'happened.',
        isTouchable ? 'Tap' : 'Click',
        'for more details.',
    ].join(' ')

    return (
        <Fragment>
            <button
                onClick={open}
                className={styles.Error}
                data-tooltip={message}
                data-tooltip-placement="right">
                <Warning inverse />
            </button>
            <ErrorDialog opened={opened} close={close} />
        </Fragment>
    )
}

function ErrorDialog({ opened, close }) {
    const { errors } = useMapState()
    function reload() {
        window.location.reload(true)
    }

    useEventListener('keyup', event => {
        if (keycodes.esc === event.keyCode) {
            close()
        }
    })

    return (
        <Dialog open={opened}>
            <Header>
                <span>Errors</span>
                <Close onClick={close} />
            </Header>
            <Body>
                {Array.from(errors).map((error, index) => (
                    <details key={index}>
                        <Error component="summary">
                            {error.message || error.error.message}
                        </Error>
                    </details>
                ))}
            </Body>
            <Footer>
                <Shim right>
                    <Button onClick={reload}>Reload</Button>
                </Shim>
                <Button onClick={close}>Close</Button>
            </Footer>
        </Dialog>
    )
}

// Constants
const PATHS = new Map([
    [TYPES.HOT_ZONE_REPORTS, 'advisories'],
    [TYPES.FORECASTS, 'forecasts'],
])
const SEARCHS = new Map([
    [TYPES.WEATHER_STATION, 'weather-stations'],
    [
        TYPES.MOUNTAIN_INFORMATION_NETWORK,
        'mountain-information-network-submissions',
    ],
    [
        TYPES.MOUNTAIN_INFORMATION_NETWORK + '-incidents',
        'mountain-information-network-submissions',
    ],
    [TYPES.FATAL_ACCIDENT, 'fatal-accidents'],
    [TYPES.MOUNTAIN_CONDITIONS_REPORTS, 'mountain-conditions-reports'],
])
