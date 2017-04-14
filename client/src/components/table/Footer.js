import React, {DOM} from 'react'
import PropTypes from 'prop-types'
import {Element} from '~/compose'
import styles from './Table.css'

export default Element({
    name: 'Footer',
    component: DOM.tfoot,
    styles,
})
