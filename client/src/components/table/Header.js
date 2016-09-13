import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Table.css'

Header.propTypes = {
    children: PropTypes.element.isRequired,
}

function Header({children}) {
    return (
        <thead styleName='Header'>
            {children}
        </thead>
    )
}

export default CSSModules(Header, styles)
