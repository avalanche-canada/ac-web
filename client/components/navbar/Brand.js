import { compose, withProps } from 'recompose'
import { neverUpdate } from '~/compose'
import CSSModules from 'react-css-modules'
import styles from './Navbar.css'
import Link from './Link'

export default compose(
    neverUpdate,
    withProps({
        styleName: 'Brand',
    }),
    CSSModules(styles)
)(Link)
