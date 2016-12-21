import {PropTypes} from 'react'
import {compose, shouldUpdate, mapProps, setPropTypes} from 'recompose'
import CSSModules from 'react-css-modules'
import Link from './Link'
import styles from './Navbar.css'

export default compose(
    setPropTypes({
        isFoundation: PropTypes.bool,
    }),
    shouldUpdate(() => false),
    mapProps(({isFoundation = false}) => ({
        to: isFoundation ? '/foundation/donate' : '/foundation',
        styleName: 'Donate',
        children: 'Donate'
    })),
    CSSModules(styles),
)(Link)
