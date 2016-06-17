import React, { PropTypes } from 'react'
import { compose, mapProps, setDisplayName, setPropTypes } from 'recompose'
import CSSModules from 'react-css-modules'
import styles from './Navbar.css'
import Link from './Link'

const propTypes = {
    isFoundation: PropTypes.bool
}

function propsMapper({ isFoundation = false }) {
    return {
        to: isFoundation ? 'foundation' : '',
        title: isFoundation ? 'Avalanche Canada Foundation' : 'Avalanche Canada',
        styleName: isFoundation ? 'Brand--Foundation' : 'Brand'
    }
}

export default compose(
    setDisplayName('Brand'),
    setPropTypes(propTypes),
    mapProps(propsMapper),
)(CSSModules(Link, styles))
