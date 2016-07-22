import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Forecast.css'
import {InnerHTML} from 'components/misc'

Headline.propTypes = {
    children: PropTypes.string.isRequired,
}

function Headline({ children }) {
    return (
        <header styleName='Headline'>
            <InnerHTML>
                {children}
            </InnerHTML>
        </header>
    )
}

export default CSSModules(Headline, styles)
