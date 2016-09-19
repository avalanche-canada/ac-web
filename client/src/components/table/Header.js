import {PropTypes, DOM} from 'react'
import {Element} from 'compose'
import styles from './Table.css'

export default Element({
    name: 'Header',
    component: DOM.thead,
    styles,
})
