import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Navbar from './Navbar'
import Cabinet from 'components/drawer'
import { createItem } from './Factories'
import Burger from './Burger'
import ItemSet from './ItemSet'
import Brand from './Brand'
import Donate from './Donate'
import { useWindowSize, useBoolean } from 'hooks'
import { useLocation } from 'router/hooks'
import LOGO from 'styles/AvalancheCanada.svg'
import styles from './Navbar.css'

Layout.propTypes = {
    menu: PropTypes.object,
    logo: PropTypes.string,
    donate: PropTypes.string,
    children: PropTypes.node,
}

export default function Layout({ menu = MENU, logo = LOGO, donate, children }) {
    const { location } = useLocation()
    const [isCabinetOpened, showCabinet, hideCabinet] = useBoolean(false)
    const { width } = useWindowSize()
    const fullNavbar = width > 768
    const { to, label } = menu
    const style = {
        backgroundImage: `url("${logo}")`,
    }

    useEffect(() => {
        if (isCabinetOpened) {
            hideCabinet()
        }
    }, [location])

    return (
        <div className={styles.Layout}>
            <Navbar>
                <Brand to={to} title={label} style={style} />
                {fullNavbar && (
                    <ItemSet location={location}>
                        {menu.children.map(createItem)}
                        {children}
                    </ItemSet>
                )}
                {fullNavbar || <Burger onClick={showCabinet} />}
                {donate && <Donate to={donate} />}
            </Navbar>
            {fullNavbar || (
                <Cabinet
                    menu={menu}
                    show={isCabinetOpened}
                    onClose={hideCabinet}
                />
            )}
        </div>
    )
}

// Constants
const MENU = {
    label: 'Avalanche Canada',
    to: '/',
    children: [],
}
