import {Element} from 'compose'
import {PropTypes, DOM} from 'react'
import styles from './Controls.css'

export default Element({
    name: 'Select',
    styles,
    component: DOM.select,
    propTypes: {
        children: PropTypes.node.isRequired,
    },
})
