import React from 'react'
import { Router } from '@reach/router'
import Forecast from 'layouts/drawers/Forecast'
import MountainInformationNetwork from 'layouts/drawers/MountainInformationNetwork'
import WeatherStation from 'layouts/drawers/WeatherStation'
import FatalAccident from 'layouts/drawers/FatalAccident'
import MountainConditionsReport from 'layouts/drawers/MountainConditionsReport'
import { useMenu } from 'contexts/menu'
import Drawer, { LEFT, RIGHT } from 'components/page/drawer'
import { Menu as Icon } from 'components/icons'
import Button, { SUBTILE } from 'components/button'
import Content from './Menu'
import { usePrimaryDrawer, useSecondaryDrawer } from './hooks'
import styles from 'components/page/drawer/Drawer.module.css'
import * as products from 'constants/products'
import { createPath } from 'utils/product'

export function Menu() {
    const { opened, close } = useMenu()

    return (
        <Drawer side={LEFT} width={300} backdrop open={opened} onCloseClick={close}>
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

export function Primary() {
    const { opened } = usePrimaryDrawer()

    return (
        <Drawer side={RIGHT} open={opened}>
            <Router className={styles.Content}>
                <Forecast path={createPath(products.FORECAST, ':id', null)} />
            </Router>
        </Drawer>
    )
}

export function Secondary() {
    const { product, id, opened } = useSecondaryDrawer()

    return (
        <Drawer open={opened} side={LEFT}>
            {ProductComponents.has(product) ? <ProductComponent product={product} id={id} /> : null}
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
