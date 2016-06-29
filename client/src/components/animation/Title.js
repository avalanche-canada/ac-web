import {PropTypes, DOM} from 'react'
import {Element} from 'compose'
import styles from './Animation.css'

export default Element({
    propTypes: {
        children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    },
    name: 'Title',
    component: DOM.p,
    styles,
})
