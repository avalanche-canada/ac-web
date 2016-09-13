import {compose, setDisplayName, withProps, defaultProps} from 'recompose'
import CSSModules from 'react-css-modules'
import Button from './Button'
import {SUBTILE} from './kinds'
import styles from './Button.css'

export default compose(
    setDisplayName('Close'),
    CSSModules(styles),
    withProps({
        children: '×',
        kind: SUBTILE,
        styleName: 'Close',
    }),
)(Button)
