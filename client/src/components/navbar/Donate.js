import {PropTypes} from 'react'
import {compose, shouldUpdate, mapProps, setPropTypes} from 'recompose'
import CSSModules from 'react-css-modules'
import Link from './Link'
import styles from './Navbar.css'

const paypal = 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=87JTBQBSCN6PS'

export default compose(
    setPropTypes({
        isFoundation: PropTypes.bool,
    }),
    shouldUpdate(() => false),
    mapProps(({isFoundation = false}) => ({
        to: isFoundation ? paypal : '/foundation',
        styleName: 'Donate',
        children: 'Donate'
    })),
    CSSModules(styles),
)(Link)
