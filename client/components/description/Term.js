import React, { memo } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import styles from './Description.css'

Term.propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
    block: PropTypes.bool,
}

function Term({ style, block, className, children }) {
    className = classNames(className, { Term: true, Block: block })

    return (
        <dt className={className} style={style}>
            {children}
        </dt>
    )
}

export default memo(Term)

const classNames = classnames.bind(styles)
