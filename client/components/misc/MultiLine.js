import React from 'react'
import PropTypes from 'prop-types'

MultiLine.propTypes = {
    children: PropTypes.node,
}

export default function MultiLine({ children = null }) {
    if (typeof children === 'string') {
        return children
            .split(/\r\n|\r|\n/gm)
            .map((text, index) => <p key={index}>{text}</p>)
    }

    return children
}
