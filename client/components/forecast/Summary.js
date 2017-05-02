import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Forecast.css'

Summary.propTypes = {
    title: PropTypes.node,
    children: PropTypes.node,
}

function Summary({ title, children }) {
    if (!children) {
        return null
    }

    return (
        <div styleName="Summary">
            <h3>{title}</h3>
            {children}
        </div>
    )
}

export default CSSModules(Summary, styles)
