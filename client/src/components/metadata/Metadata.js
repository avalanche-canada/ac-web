import {PropTypes} from 'react'
import {Element, elementQueries} from 'compose'
import styles from './Metadata.css'

const element = Element({
    name: 'Metadata',
    styles,
    propTypes: {
        children: PropTypes.node.isRequired,
    },
})

export default elementQueries()(element)
