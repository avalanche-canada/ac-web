import React from 'react'
import PropTypes from 'prop-types'
import styles from './Form.css'

Form.propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.object,
}

export default function Form({ children, style }) {
    return (
        <form className={styles.Form} style={style}>
            {children}
        </form>
    )
}
