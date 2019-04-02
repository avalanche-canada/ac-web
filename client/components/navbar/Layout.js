import React from 'react'
import PropTypes from 'prop-types'
import { Location } from '@reach/router'
import Navbar from './Navbar'
import Cabinet from 'components/drawer'
import { createItem } from './Factories'
import styles from './Navbar.css'
import Burger from './Burger'
import ItemSet from './ItemSet'
import Brand from './Brand'
import Donate from './Donate'
import { useWindowSize, useBoolean } from 'utils/react/hooks'

Layout.propTypes = {
    menu: PropTypes.object.isRequired,
    logo: PropTypes.string.isRequired,
    donate: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}

export default function Layout({ menu, logo, donate, children }) {
    const [isCabinetOpened, showCabinet, hideCabinet] = useBoolean(false)
    const { width } = useWindowSize()
    const fullNavbar = width > 768
    const { to, label } = menu
    const style = {
        backgroundImage: `url("${logo}")`,
    }

    return (
        <Location>
            {({ location }) => (
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
                        <Donate to={donate} />
                    </Navbar>
                    {fullNavbar || (
                        <Cabinet
                            location={location}
                            menu={menu}
                            show={isCabinetOpened}
                            onClose={hideCabinet}
                        />
                    )}
                </div>
            )}
        </Location>
    )
}
