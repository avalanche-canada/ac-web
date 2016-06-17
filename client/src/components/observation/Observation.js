import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Observation.css'

Observation.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
}

function Observation({ children }) {
    return (
        <section styleName='Observation'>
            {children}
        </section>
    )
}

export default CSSModules(Observation, styles)
