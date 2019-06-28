import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Button from './Button'
import { SUBTILE } from './kinds'
import styles from './Button.css'

Close.propTypes = {
    className: PropTypes.string,
    children: PropTypes.element.isRequired,
}

export default function Close({ children = '×', ...props }) {
    return (
        <Button
            kind={SUBTILE}
            {...props}
            className={classnames(styles.Close, props.className)}>
            {children}
        </Button>
    )
}
