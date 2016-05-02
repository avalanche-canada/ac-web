import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Forecast.css'

function Bulletin({ children }) {
    return (
        <section styleName='Bulletin'>
            {children}
        </section>
    )
}

export default CSSModules(Bulletin, styles)
