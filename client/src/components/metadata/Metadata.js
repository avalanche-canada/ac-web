import {PropTypes} from 'react'
import {Element} from 'compose'
import styles from './Metadata.css'

const name = 'Metadata'
const propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
}

export default Element({name, styles, propTypes})
