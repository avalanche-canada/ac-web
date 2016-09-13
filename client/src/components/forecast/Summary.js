import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import {InnerHTML} from 'components/misc'
import styles from './Forecast.css'

Summary.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.string,
}

function Summary({title, children}) {
    return (
        <div styleName='Summary'>
            <h3>{title}</h3>
            <InnerHTML>
                {children}
            </InnerHTML>
        </div>
    )
}

export default CSSModules(Summary, styles)
