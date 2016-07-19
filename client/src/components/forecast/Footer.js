import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Forecast.css'

Footer.propTypes = {
    author: PropTypes.string,
}

function Footer({author}) {
    if (!author) {
        return null
    }
    
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
