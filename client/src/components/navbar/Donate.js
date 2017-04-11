import PropTypes from 'prop-types'
import {compose, mapProps, setPropTypes} from 'recompose'
import {neverUpdate} from '/compose'
import CSSModules from 'react-css-modules'
import Link from './Link'
import styles from './Navbar.css'

export default compose(
    setPropTypes({
        isFoundation: PropTypes.bool,
    }),
    neverUpdate,
    mapProps(({isFoundation = false}) => ({
        to: isFoundation ? '/foundation/donate' : '/foundation',
        styleName: 'Donate',
        children: 'Donate'
    })),
    CSSModules(styles),
)(Link)
