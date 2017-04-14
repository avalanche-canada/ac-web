import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Page.css'
import {Map, NavigationControl} from '~/components/map'

function handleLoad(event) {
    // event.target
}

ContextMap.propTypes = {
    children: PropTypes.node.isRequired,
}

function ContextMap({children, ...props}) {
    return (
        <div styleName='ContextMap'>
            <Map style='2016' {...props} onLoad={handleLoad} >
                {children}
                <NavigationControl />
            </Map>
        </div>
    )
}

export default CSSModules(ContextMap, styles)
