import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Button from './Button'
import { SUBTILE } from './kinds'
import styles from './Button.css'

Close.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
}

export default function Close({ children = '×', className, ...rest }) {
    return (
        <Button
            kind={SUBTILE}
            className={classnames(styles.Close, className)}
            {...rest}>
            {children}
        </Button>
    )
}
