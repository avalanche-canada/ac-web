import { createElement } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import css from './Shim.css'

Shim.propTypes = {
    children: PropTypes.node,
    top: PropTypes.bool,
    right: PropTypes.bool,
    bottom: PropTypes.bool,
    left: PropTypes.bool,
    vertical: PropTypes.bool,
    horizontal: PropTypes.bool,
    all: PropTypes.bool,
    as: PropTypes.string,
    className: PropTypes.string,
}

export default function Shim({ children, as = 'div', className, ...values }) {
    className = classnames(
        className,
        Object.keys(values)
            .filter(Boolean)
            .map(key => css[key])
    )

    return createElement(as, { className }, children)
}
