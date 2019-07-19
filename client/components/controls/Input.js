import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styles from './Controls.css'

Input.propTypes = {
    className: PropTypes.string,
}

export default function Input({ className, ...props }) {
    return <input {...props} className={classnames(styles.Input, className)} />
}
