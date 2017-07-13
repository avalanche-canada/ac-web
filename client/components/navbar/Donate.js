import { compose, defaultProps } from 'recompose'
import { neverUpdate } from '~/compose'
import CSSModules from 'react-css-modules'
import Link from './Link'
import styles from './Navbar.css'

export default compose(
    neverUpdate,
    defaultProps({
        styleName: 'Donate',
        children: 'Donate',
    }),
    CSSModules(styles)
)(Link)
