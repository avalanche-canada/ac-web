import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Link from './Link'
import Cabinet from 'components/drawer'
import { createItem } from './Factories'
import ItemSet from './ItemSet'
import { Menu } from 'components/icons'
import Button, { INCOGNITO } from '../button'
import { useWindowSize, useBoolean } from 'hooks'
import { useLocation } from 'router/hooks'
import LOGO from 'styles/AvalancheCanada.svg'
import styles from './Navbar.module.css'

Layout.propTypes = {
    menu: PropTypes.object,
    logo: PropTypes.string,
    children: PropTypes.node,
}

export default function Layout({ menu = MENU, logo = LOGO, children }) {
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
            <nav className={styles.Navbar}>
                <Brand to={to} title={label} style={style} />
                {fullNavbar ? (
                    <ItemSet location={location}>
                        {menu.children.map(createItem)}
                        {children}
                    </ItemSet>
                ) : (
                    <Burger onClick={showCabinet} />
                )}
            </nav>
            {fullNavbar || <Cabinet menu={menu} show={isCabinetOpened} onClose={hideCabinet} />}
        </div>
    )
}

// Utils
function Brand({ children, ...props }) {
    return (
        <Link className={styles.Brand} {...props}>
            {children}
        </Link>
    )
}
function Burger({ onClick }) {
    return (
        <div className={styles['Burger--Container']}>
            <Button kind={INCOGNITO} className={styles.Burger} onClick={onClick}>
                <Menu width={32} height={32} />
            </Button>
        </div>
    )
}

// Constants
const MENU = {
    label: 'Avalanche Canada',
    to: '/',
    children: [],
}
