import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Drawer.css'

Subject.propTypes = {
    children: PropTypes.string.isRequired,
}

function Subject({children}) {
    return (
        <div styleName='Subject'>
            <span>{children}</span>
        </div>
    )
}

export default CSSModules(Subject, styles)
