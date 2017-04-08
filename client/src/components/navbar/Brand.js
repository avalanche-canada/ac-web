import React from 'react'
import PropTypes from 'prop-types'
import {compose, mapProps, setDisplayName, setPropTypes} from 'recompose'
import {neverUpdate} from 'compose'
import CSSModules from 'react-css-modules'
import styles from './Navbar.css'
import Link from './Link'

export default compose(
    setDisplayName('Brand'),
    setPropTypes({
        isFoundation: PropTypes.bool
    }),
    neverUpdate,
    mapProps(({isFoundation = false}) => ({
        to: isFoundation ? '/foundation' : '/',
        title: isFoundation ? 'Avalanche Canada Foundation' : 'Avalanche Canada',
        styleName: isFoundation ? 'Brand--Foundation' : 'Brand'
    })),
    CSSModules(styles),
)(Link)
