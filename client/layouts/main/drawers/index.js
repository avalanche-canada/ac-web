import React, { createElement } from 'react'
import { Router, Redirect } from '@reach/router'
import Forecast, { Covid as CovidForecast } from 'layouts/drawers/Forecast'
import HotZoneReport from 'layouts/drawers/HotZoneReport'
import MountainInformationNetwork from 'layouts/drawers/MountainInformationNetwork'
import WeatherStation from 'layouts/drawers/WeatherStation'
import FatalAccident from 'layouts/drawers/FatalAccident'
import MountainConditionsReport from 'layouts/drawers/MountainConditionsReport'
import { useMenu } from 'contexts/menu'
import Drawer, { LEFT, RIGHT } from 'components/page/drawer'
import { Menu as Icon } from 'components/icons'
import Button, { SUBTILE } from 'components/button'
import Content from './Menu'
import {
    usePrimaryDrawerParams,
    useSecondaryDrawerParams,
    useFlyTo,
    useFitBounds,
} from './hooks'
import styles from 'components/page/drawer/Drawer.css'

export function Menu() {
    const { opened, close } = useMenu()

    return (
        <Drawer
            side={LEFT}
            width={300}
            backdrop
            open={opened}
            onCloseClick={close}>
            <Content onCloseClick={close} />
        </Drawer>
    )
}

export function ToggleMenu() {
    const { toggle } = useMenu()

    return (
        <Button style={STYLE} onClick={toggle} kind={SUBTILE}>
            <Icon />
        </Button>
    )
}

export function Primary({ map }) {
    const { opened, close } = usePrimaryDrawerParams()
    const flyTo = useFlyTo(map)
    const fitBounds = useFitBounds(map)

    return (
        <Drawer side={RIGHT} open={opened}>
            <Router className={styles.Content}>
                <Forecast
                    path="forecasts/kananaskis"
                    onCloseClick={close}
                    onLocateClick={fitBounds}
                />
                <CovidForecast path="forecasts/:name" onCloseClick={close} />
                <HotZoneReport
                    path="advisories/:name"
                    onCloseClick={close}
                    onLocateClick={flyTo}
                />
                <Redirect
                    from="hot-zone-reports/:name"
                    to="map/advisories/:name"
                />
            </Router>
        </Drawer>
    )
}

export function Secondary({ map }) {
    const { type, id, opened, close } = useSecondaryDrawerParams()
    const onLocateClick = useFlyTo(map)
    const props = {
        id,
        onCloseClick: close,
        onLocateClick,
    }
    const children = opened
        ? createElement(SecondaryComponents.get(type), props)
        : null

    return (
        <Drawer open={opened} side={LEFT}>
            {children}
        </Drawer>
    )
}

// Components
const SecondaryComponents = new Map([
    ['mountain-information-network-submissions', MountainInformationNetwork],
    ['weather-stations', WeatherStation],
    ['fatal-accidents', FatalAccident],
    ['mountain-conditions-reports', MountainConditionsReport],
])

// Style
const STYLE = {
    position: 'absolute',
    top: '0.75em',
    left: '0.75em',
    backgroundColor: 'white',
    zIndex: 13,
}
