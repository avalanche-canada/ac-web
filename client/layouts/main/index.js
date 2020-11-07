import React, { useState, useEffect, Fragment } from 'react'
import { Link, Match, Redirect } from '@reach/router'
import { supported } from 'utils/mapbox'
import { UnsupportedMap, Screen } from 'layouts/pages'
import { Warning } from 'components/icons'
import { Menu, ToggleMenu, Primary, Secondary } from './drawers'
import externals, { open } from 'router/externals'
import { Provider as MenuProvider } from 'contexts/menu'
import { Provider as LayersProvider } from 'contexts/layers'
import {
    Provider as MapStateProvider,
    useMapState,
    ERRORS,
    useGuessBounds,
} from 'contexts/map/state'
import { isTouchable } from 'utils/device'
import { pluralize } from 'utils/string'
import keycodes from 'constants/keycodes'
import { useBoolean, useEventListener } from 'hooks'
import Dialog, { Header, Footer, Body } from 'components/dialog'
import { Close } from 'components/button'
import Button from 'components/button'
import { Details } from 'components/error'
import Shim from 'components/Shim'
import shim from 'components/Shim.css'
import { useMapClickHandler } from './drawers/hooks'
import { Map as MapComponent, useNavigationControl } from 'hooks/mapbox'
import {
    useForecastRegions,
    useWeatherStations,
    useMountainConditionReports,
    useFatalAccidents,
    useAdvisories,
    useMountainInformationNetwork,
    useForecastMarkers,
} from './layers'
import styles from './Map.css'
import typography from 'components/text/Text.css'

export default supported() ? Wrapper : UnsupportedMap

function Wrapper() {
    return (
        <LayersProvider>
            <MenuProvider>
                <MapStateProvider>
                    <Main />
                </MapStateProvider>
            </MenuProvider>
        </LayersProvider>
    )
}

function Main() {
    const [map, setMap] = useState(null)
    const handleMapClick = useMapClickHandler(map)
    const { zoom, center, errors } = useMapState()
    const bounds = useGuessBounds()
    const options = { zoom: zoom.value, center: center.value }

    // Initialize map with listeners
    useEffect(() => {
        if (!map) {
            return
        }

        map.on('zoomend', () => {
            zoom.set(map.getZoom())
        })
        map.on('moveend', () => {
            center.set(map.getCenter())
        })
        map.on('error', ({ error }) => {
            errors.add(ERRORS.MAP, error)
        })
    }, [map])

    // Initialize map click handler whenever "map" and the "listener" change
    useEffect(() => {
        if (!map) {
            return
        }

        map.on('click', handleMapClick)

        return () => {
            map.off('click', handleMapClick)
        }
    }, [map, handleMapClick])

    // Change map's camera based on the guessed bounds
    useEffect(() => {
        if (map && bounds) {
            map.fitBounds(bounds)
        }
    }, [map, bounds, zoom.value])

    useNavigationControl(map)

    useForecastRegions(map)
    useWeatherStations(map)
    useMountainConditionReports(map)
    useFatalAccidents(map)
    useAdvisories(map)
    useMountainInformationNetwork(map)
    useForecastMarkers(map)

    return (
        <Screen>
            <MapComponent
                ref={setMap}
                options={options}
                className={styles.Map}
            />
            <Primary map={map} />
            <Secondary map={map} />
            <Menu />
            <ToggleMenu />
            <LinkControlSet />
            <Match path="forecasts/:name">{openExternalForecast}</Match>
        </Screen>
    )
}

// Utils
function openExternalForecast({ match, location }) {
    // TODO Find a better way to do this! We should rely on what the server is providing as "externalURL"!

    if (!match || !externals.has(match.name)) {
        return null
    }

    open(match.name)

    return <Redirect to={'/map' + location.search} />
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
    const [opened, open, close] = useBoolean(false)
    const { errors } = useMapState()
    const { total } = errors

    if (total === 0) {
        return null
    }

    const message = [
        pluralize('error', total, true),
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
                Uh oh! We never thought that would happen...
                <Close onClick={close} />
            </Header>
            <Body>
                <p>
                    <strong>
                        {pluralize('error', errors.total, true) + ' occured.'}
                    </strong>{' '}
                    You can still use the map. However, some data might be
                    missing and behaviour not working as expected. Click on the
                    arrow for more details.
                </p>
                {Array.from(errors.value.entries()).map(([type, errors]) => (
                    <Details
                        key={type.description}
                        summary={SUMMARIES.get(type)}
                        className={shim.vertical}>
                        <ul className={typography.Initial}>
                            {Array.from(errors).map((error, index) => (
                                <li key={index}>{error.message}</li>
                            ))}
                        </ul>
                    </Details>
                ))}
            </Body>
            <Footer>
                <Shim right>
                    <Button onClick={reload}>Reload the page</Button>
                </Shim>
                <Button onClick={close}>Close</Button>
            </Footer>
        </Dialog>
    )
}

const PREFIX = 'A problem happened while loading '
const SUFFIX = ' data on the map'
const SUMMARIES = new Map([
    [ERRORS.MAP, 'A problem happened while showing the map'],
    [ERRORS.FORECAST, PREFIX + 'forecast' + SUFFIX],
    [ERRORS.WEATHER_STATION, PREFIX + 'weather station' + SUFFIX],
    [
        ERRORS.MOUNTAIN_CONDITIONS_REPORT,
        PREFIX + 'Mountain Conditions' + SUFFIX,
    ],
    [ERRORS.INCIDENT, PREFIX + 'incident' + SUFFIX],
    [ERRORS.ADVISORY, PREFIX + 'advisory' + SUFFIX],
    [
        ERRORS.MOUNTAIN_INFORMATION_NETWORK,
        PREFIX + 'Monutain Information Network (MIN)' + SUFFIX,
    ],
])
