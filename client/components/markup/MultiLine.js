import { createElement } from 'react'
import PropTypes from 'prop-types'

MultiLine.propTypes = {
    children: PropTypes.node,
    as: PropTypes.string,
}

export default function MultiLine({ children, as = 'p' }) {
    if (typeof children === 'string') {
        return children
            .split(/\r\n|\r|\n/gm)
            .map((text, key) => createElement(as, { key }, text))
    }

    return children || null
}
