import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Navbar.css'

Headline.propTypes = {
    children: PropTypes.node.isRequired
}

function Headline({children}) {
    return (
        <p styleName='Headline'>
            {children}
        </p>
    )
}

export default CSSModules(Headline, styles)
