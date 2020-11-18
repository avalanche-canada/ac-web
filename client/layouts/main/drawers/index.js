import React from 'react'
import { Router, Redirect } from '@reach/router'
import Forecast from 'layouts/drawers/Forecast'
import Advisory from 'layouts/drawers/HotZoneReport'
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
    usePrimaryDrawer,
    useSecondaryDrawer,
    useFlyTo,
    useFitBounds,
} from './hooks'
import styles from 'components/page/drawer/Drawer.css'
import * as products from 'constants/products'
import { createPath } from 'utils/product'

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
    const { opened, close } = usePrimaryDrawer()
    const flyTo = useFlyTo(map)
    const fitBounds = useFitBounds(map)

    return (
        <Drawer side={RIGHT} open={opened}>
            <Router className={styles.Content}>
                <Forecast
                    path={createPath(products.FORECAST, ':slug', null)}
                    onCloseClick={close}
                    onLocateClick={fitBounds}
                />
                <Advisory
                    path={createPath(products.ADVISORY, ':slug', null)}
                    onCloseClick={close}
                    onLocateClick={flyTo}
                />
                <Redirect
                    from="hot-zone-reports/:slug"
                    to={createPath(products.ADVISORY, ':slug')}
                />
            </Router>
        </Drawer>
    )
}

export function Secondary({ map }) {
    const { product, id, opened, close } = useSecondaryDrawer()
    const onLocateClick = useFlyTo(map)

    return (
        <Drawer open={opened} side={LEFT}>
            {ProductComponents.has(product) ? (
                <ProductComponent
                    product={product}
                    id={id}
                    onCloseClick={close}
                    onLocateClick={onLocateClick}
                />
            ) : null}
        </Drawer>
    )
}

// Components
function ProductComponent({ product, ...props }) {
    const Component = ProductComponents.get(product)

    return <Component {...props} />
}
const ProductComponents = new Map([
    [products.MOUNTAIN_INFORMATION_NETWORK, MountainInformationNetwork],
    [products.WEATHER_STATION, WeatherStation],
    [products.ACCIDENT, FatalAccident],
    [products.MOUNTAIN_CONDITIONS_REPORT, MountainConditionsReport],
])

// Style
const STYLE = {
    position: 'absolute',
    top: '0.75em',
    left: '0.75em',
    backgroundColor: 'white',
    zIndex: 13,
}
