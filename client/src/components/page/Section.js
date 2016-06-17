import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Page.css'

Section.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    title: PropTypes.string.isRequired,
    headline: PropTypes.string,
}

function Section({ title, headline, children }) {
    return (
        <section styleName='Section'>
            <header>
                <h2>{title}</h2>
                {headline && <p styleName='Section--Headline'>{headline}</p>}
            </header>
            {children}
        </section>
    )
}

export default CSSModules(Section, styles)
