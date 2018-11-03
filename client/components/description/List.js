import React, { memo } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import styles from './Description.css'

List.propTypes = {
    children: PropTypes.node.isRequired,
    columns: PropTypes.oneOf([1, 2, 3]),
    theme: PropTypes.oneOf(['Simple', 'Inverse']),
    condensed: PropTypes.bool,
    bordered: PropTypes.bool,
    style: PropTypes.object,
}

function List({
    columns = 1,
    theme = 'Simple',
    condensed = false,
    bordered = false,
    style,
    children,
}) {
    const className = classNames(`List--${theme}--${columns}Columns`, {
        Condensed: condensed,
        Bordered: bordered,
    })

    return (
        <dl style={style} className={className}>
            {children}
        </dl>
    )
}

const classNames = classnames.bind(styles)

export default memo(List)
