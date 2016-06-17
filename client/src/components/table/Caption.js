import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Table.css'

Caption.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
}

function Caption({children}) {
    return (
        <caption styleName='Caption'>
            {children}
        </caption>
    )
}

export default CSSModules(Caption, styles)
