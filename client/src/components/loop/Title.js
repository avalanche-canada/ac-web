import {PropTypes, DOM} from 'react'
import {Element} from 'compose'
import styles from './Loop.css'

export default Element({
    name: 'Title',
    propTypes: {
        children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    },
    component: DOM.p,
    styles,
})
