import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './SPAW.css'

SPAW.propTypes = {
    children: PropTypes.node,
}

function SPAW({children = 'Special Avalanche Warning'}) {
    return (
        <span styleName='SPAW'>
            {children}
        </span>
    )
}

export default CSSModules(SPAW, styles)
