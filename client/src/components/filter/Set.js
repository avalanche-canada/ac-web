import {PropTypes} from 'react'
import {Element} from 'compose'
import styles from './Filter.css'

const name = 'Set'
const propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
}

export default Element({name, styles, propTypes})
