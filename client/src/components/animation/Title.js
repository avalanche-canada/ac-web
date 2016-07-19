import {PropTypes, DOM} from 'react'
import {Element} from 'compose'
import styles from './Animation.css'

export default Element({
    name: 'Title',
    component: DOM.p,
    styles,
    propTypes: {
        children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    },
})
