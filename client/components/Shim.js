import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import styles from './Shim.css'

Shim.propTypes = {
    children: PropTypes.node,
    top: PropTypes.bool,
    right: PropTypes.bool,
    bottom: PropTypes.bool,
    left: PropTypes.bool,
    vertical: PropTypes.bool,
    horizontal: PropTypes.bool,
    all: PropTypes.bool,
}

export default function Shim({ children, ...values }) {
    return <div className={classNames(values)}>{children}</div>
}

const classNames = classnames.bind(styles)
