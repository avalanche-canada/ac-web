import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Page.css'
import {Map, NavigationControl} from '~/components/map'
import noop from 'lodash/noop'

ContextMap.propTypes = {
    children: PropTypes.node.isRequired,
}

function ContextMap({children, ...props}) {
    return (
        <div styleName='ContextMap'>
            <Map style='2016' {...props} onLoad={noop} >
                {children}
                <NavigationControl />
            </Map>
        </div>
    )
}

export default CSSModules(ContextMap, styles)
