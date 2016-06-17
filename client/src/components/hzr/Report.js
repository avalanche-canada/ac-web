import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Report.css'

Report.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
}

function Report({ children }) {
    return (
        <section styleName='Report'>
            {children}
        </section>
    )
}

export default CSSModules(Report, styles)
