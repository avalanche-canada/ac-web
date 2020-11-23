import React, { Fragment } from 'react'
import { Link } from '@reach/router'
import { FormattedMessage, useIntl } from 'react-intl'
import { supported } from 'utils/mapbox'
import { UnsupportedMap, Screen } from 'layouts/pages'
import { Warning } from 'components/icons'
import { Menu, ToggleMenu, Primary, Secondary } from './drawers'
import { Provider as MenuProvider } from 'contexts/menu'
import { Provider as LayersProvider } from 'contexts/layers'
import { Provider as MapStateProvider, useMapState, ERRORS } from 'contexts/map/state'
import keycodes from 'constants/keycodes'
import { useBoolean, useEventListener } from 'hooks'
import Dialog, { Header, Footer, Body } from 'components/dialog'
import { Close } from 'components/button'
import Button from 'components/button'
import { Details } from 'components/error'
import Shim from 'components/Shim'
import shim from 'components/Shim.css'
import { useIntlMemo } from 'hooks/intl'
import { Map as MapProvider } from './context'
import typography from 'components/text/Text.css'
import styles from './Map.css'

export default supported() ? Main : UnsupportedMap

function Main() {
    return (
        <Screen>
            <LayersProvider>
                <MenuProvider>
                    <MapStateProvider>
                        <MapProvider>
                            <Primary />
                            <Secondary />
                            <Menu />
                            <ToggleMenu />
                            <LinkControlSet />
                        </MapProvider>
                    </MapStateProvider>
                </MenuProvider>
            </LayersProvider>
        </Screen>
    )
}

// Utils
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
