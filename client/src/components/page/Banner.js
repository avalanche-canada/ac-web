import {PropTypes, DOM} from 'react'
import {compose, mapProps, setPropTypes} from 'recompose'
import CSSModules from 'react-css-modules'
import styles from './Page.css'

export default compose(
    setPropTypes({
        url: PropTypes.string.isRequired,
    }),
    mapProps(({url, children}) => ({
        children,
        styleName: 'Banner',
        style: {
            backgroundImage: `url("${url}")`,
        },
    })),
    CSSModules(styles),
)(DOM.div)
