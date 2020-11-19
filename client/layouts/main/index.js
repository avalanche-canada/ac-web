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
import keycodes from 'constants/keycodes'
import { useBoolean, useEventListener } from 'hooks'
import Dialog, { Header, Footer, Body } from 'components/dialog'
import { Close } from 'components/button'
import Button from 'components/button'
import { Details } from 'components/error'
import Shim from 'components/Shim'
import shim from 'components/Shim.module.css'
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
import styles from './Map.module.css'
import typography from 'components/text/Text.module.css'
import { FormattedMessage, useIntl } from 'react-intl'
import { useIntlMemo } from 'hooks/intl'

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
            <MapComponent ref={setMap} options={options} className={styles.Map} />
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
    const intl = useIntl()

    return (
        <div className={styles.LinkControlSet}>
            <Link
                className={styles['LinkControlSet--MIN']}
                to="/submit"
                data-tooltip={intl.formatMessage({
                    description: 'Layout main/index',
                    defaultMessage: 'Create a Mountain Information Network (MIN) report',
                })}
                data-tooltip-placement="right"
            />
            <Link
                className={styles['LinkControlSet--Weather']}
                to="/weather"
                data-tooltip={intl.formatMessage({
                    description: 'Layout main/index',
                    defaultMessage: 'Visit the Mountain Weather Forecast',
                })}
                data-tooltip-placement="right"
            />
            <ErrorIndicator />
        </div>
    )
}
function ErrorIndicator() {
    const intl = useIntl()
    const [opened, open, close] = useBoolean(false)
    const { errors } = useMapState()
    const { total } = errors

    if (total === 0) {
        return null
    }

    const message = intl.formatMessage(
        {
            description: 'Layout main/index',
            defaultMessage:
                '{count, plural, one {One error} other {# errors}} occurred. Click for more details.',
        },
        {
            count: total,
        }
    )

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
    const summaries = useSummaries()
    const { errors } = useMapState()
    function reload() {
        window.location.reload()
    }

    useEventListener('keyup', event => {
        if (keycodes.esc === event.keyCode) {
            close()
        }
    })

    return (
        <Dialog open={opened}>
            <Header>
                <FormattedMessage
                    description="Layout main/index"
                    defaultMessage="Uh oh! We never thought that would happen..."
                />
                <Close onClick={close} />
            </Header>
            <Body>
                <p>
                    <strong>
                        <FormattedMessage
                            description="Layout main/index"
                            defaultMessage="{count, plural, one {One error} other {# errors}} occurred."
                            values={{ count: errors.total }}
                        />
                    </strong>
                </p>
                <p>
                    <FormattedMessage
                        description="Layout main/index"
                        defaultMessage="You can still use the map. However, some data might be missing and behaviour not working as expected. Click on the arrow for more details."
                    />
                </p>
                {Array.from(errors.value.entries(), ([type, errors]) => (
                    <Details
                        key={type.description}
                        summary={summaries.get(type)}
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
                    <Button onClick={reload}>
                        <FormattedMessage defaultMessage="Reload the map" />
                    </Button>
                </Shim>
                <Button onClick={close}>
                    <FormattedMessage defaultMessage="Close" />
                </Button>
            </Footer>
        </Dialog>
    )
}

function useSummaries() {
    return useIntlMemo(intl => {
        const description = 'Layout main/Map error displayed to users'

        return new Map([
            [
                ERRORS.MAP,
                intl.formatMessage({
                    description,
                    defaultMessage: 'A problem happened while showing the map',
                }),
            ],
            [
                ERRORS.FORECAST,
                intl.formatMessage({
                    description,
                    defaultMessage: 'A problem happened while loading forecast on the map.',
                }),
            ],
            [
                ERRORS.WEATHER_STATION,
                intl.formatMessage({
                    description,
                    defaultMessage: 'A problem happened while loading Weather Station on the map.',
                }),
            ],
            [
                ERRORS.MOUNTAIN_CONDITIONS_REPORT,
                intl.formatMessage({
                    description,
                    defaultMessage:
                        'A problem happened while loading Mountain Conditions Reports on the map.',
                }),
            ],
            [
                ERRORS.INCIDENT,
                intl.formatMessage({
                    description,
                    defaultMessage: 'A problem happened while loading Incidents on the map.',
                }),
            ],
            [
                ERRORS.ADVISORY,
                intl.formatMessage({
                    description,
                    defaultMessage: 'A problem happened while loading Advisories on the map.',
                }),
            ],
            [
                ERRORS.MOUNTAIN_INFORMATION_NETWORK,
                intl.formatMessage({
                    description,
                    defaultMessage:
                        'A problem happened while loading Mountain Information Network (MIN) Reports on the map.',
                }),
            ],
        ])
    })
}
