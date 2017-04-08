import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import Layer from './Layer'
import Subject from '../Subject'
import styles from './Layer.css'

LayerSet.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}

function LayerSet({title, children}) {
    return (
        <div styleName='LayerSet'>
            <Subject>{title}</Subject>
            {children}
        </div>
    )
}

export default CSSModules(LayerSet, styles)
