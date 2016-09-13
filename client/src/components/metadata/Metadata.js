import {PropTypes} from 'react'
import {Element, elementQueries} from 'compose'
import styles from './Metadata.css'

export default Element({
    name: 'Metadata',
    styles,
    propTypes: {
        children: PropTypes.arrayOf(PropTypes.element).isRequired,
    },
    composers: [elementQueries()]
})
