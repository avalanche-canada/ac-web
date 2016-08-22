import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import {InnerHTML} from 'components/misc'
import styles from './Problem.css'

Advice.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
}

function Advice({children}) {
    return (
        <div styleName='Advice'>
            <h3 styleName='SubHeader'>
                Travel and Terrain Advice
            </h3>
            <InnerHTML>
                {children}
            </InnerHTML>
        </div>
    )
}

export default CSSModules(Advice, styles)
