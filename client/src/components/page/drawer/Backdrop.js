import PropTypes from 'prop-types'
import {Element} from '~/compose'
import styles from './Drawer.css'

export default Element({
    name: 'Backdrop',
    styles,
    propTypes: {
        onClick: PropTypes.func.isRequired
    },
})
