import React, { useCallback, useState, useEffect, Fragment } from 'react'
import { Link, Match } from '@reach/router'
import { supported } from 'utils/mapbox'
import Base from './Map'
import UnsupportedMap from './UnsupportedMap'
import { Warning } from 'components/icons'
import { Menu, ToggleMenu, Primary, Secondary } from './drawers'
import externals, { open } from 'router/externals'
import { Provider as MenuProvider } from 'contexts/menu'
import { Provider as LayersProvider } from 'contexts/layers'
import { Provider as MapStateProvider, useMapState } from 'contexts/map/state'
import { isTouchable } from 'utils/device'
import { pluralize } from 'utils/string'
import keycodes from 'constants/keycodes'
import { useBoolean, useEventListener } from 'hooks'
import Dialog, { Header, Footer, Body } from 'components/dialog'
import { Close } from 'components/button'
import Button from 'components/button'
import { Error } from 'components/text'
import Shim from 'components/Shim'
import { useMapClickHandler } from './drawers/hooks'
import { useLocation } from 'router/hooks'
import styles from './Map.css'

export default (supported() ? Main : UnsupportedMap)

function Main() {
    const [map, setMap] = useState(null)
    const handleMapClick = useMapClickHandler(map)
    const { location, navigate } = useLocation()

    const openExternalForecast = useCallback(
        ({ match }) => {
            if (!match) {
                return null
            }

            const { name } = match

            if (externals.has(name)) {
                open(name)
                navigate('/map' + location.search)
            }
        },
        [location.search]
    )

    useEffect(() => {
        if (!map) {
            return
        }

        map.on('click', handleMapClick)

        return () => {
            map.off('click', handleMapClick)
        }
    }, [map, handleMapClick])

    return (
        <LayersProvider>
            <MenuProvider>
                <MapStateProvider>
                    <div className={styles.Layout}>
                        <Base ref={setMap} />
                        <Primary map={map} />
                        <Secondary map={map} />
                        <Menu />
                        <ToggleMenu />
                        <LinkControlSet />
                        <Match path="forecasts/:name">
                            {openExternalForecast}
                        </Match>
                    </div>
                </MapStateProvider>
            </MenuProvider>
        </LayersProvider>
    )
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
