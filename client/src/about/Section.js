import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Section.css'

Section.propTypes = {
    title: PropTypes.string.isRequired
}

function Section({ title, children }) {
    return (
        <section styleName='Section'>
            <h2>{title}</h2>
            <div>{children}</div>
        </section>
    )
}

export default CSSModules(Section, styles)
