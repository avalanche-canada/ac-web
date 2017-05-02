import PropTypes from 'prop-types'
import { Element } from '~/compose'
import styles from './Metadata.css'

export default Element({
    name: 'Metadata',
    styles,
    propTypes: {
        children: PropTypes.node.isRequired,
    },
})
