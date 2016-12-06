import {PropTypes, DOM} from 'react'
import {compose, withProps, setPropTypes, renameProp} from 'recompose'
import CSSModules from 'react-css-modules'
import styles from './Drawer.css'

export default compose(
    setPropTypes({
        url: PropTypes.string.isRequired,
    }),
    withProps({
        styleName: 'Banner',
    }),
    renameProp('url', 'src'),
    CSSModules(styles),
)(DOM.img)
