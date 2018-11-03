import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import styles from './Form.css'

Control.propTypes = {
    children: PropTypes.node.isRequired,
    horizontal: PropTypes.bool,
    bordered: PropTypes.bool,
}

export default function Control({ children, horizontal, bordered, ...props }) {
    const className = classNames({
        Control: !horizontal,
        'Control--Horizontal': horizontal,
        Border: bordered,
    })

    return (
        <div className={className} {...props}>
            {children}
        </div>
    )
}

const classNames = classnames.bind(styles)
