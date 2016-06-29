import {PropTypes} from 'react'
import {Element} from 'compose'
import styles from './Animation.css'

export default Element({
    name: 'Animation',
    styleName: 'Container',
    propTypes: {
        children: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
    },
    styles
})
