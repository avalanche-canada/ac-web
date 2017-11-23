import React from 'react'
import PropTypes from 'prop-types'
import styles from './Form.css'

Fieldset.propTypes = {
    children: PropTypes.node.isRequired,
}

export default function Fieldset({ children }) {
    return <fieldset className={styles.Fieldset}>{children}</fieldset>
}
