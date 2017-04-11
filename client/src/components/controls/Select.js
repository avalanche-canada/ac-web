import {DOM} from 'react'
import PropTypes from 'prop-types'
import {Element} from '/compose'
import styles from './Controls.css'

export default Element({
    name: 'Select',
    styles,
    component: DOM.select,
    propTypes: {
        children: PropTypes.node.isRequired,
    },
})
