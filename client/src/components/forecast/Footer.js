import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Forecast.css'

Footer.propTypes = {
    author: PropTypes.string.isRequired,
}

function Footer({ author }) {
    return (
        <footer styleName='Footer'>
            <dl>
                <dt>Prepared by</dt>
                <dd>{author}</dd>
            </dl>
        </footer>
    )
}

export default CSSModules(Footer, styles)
