import {PropTypes} from 'react'
import {Element} from 'compose'
import styles from './Metadata.css'

export default Element({
    name: 'Metadata',
    styles,
    propTypes: {
        children: PropTypes.node.isRequired,
    },
})
