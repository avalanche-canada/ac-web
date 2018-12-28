import React from 'react'
import PropTypes from 'prop-types'

Group.propTypes = {
    value: PropTypes.array.isRequired,
    Component: PropTypes.object.isRequired,
}

export default function Group({ value, Component, ...props }) {
    return (
        <div {...props}>
            {value.map((item, index) => (
                <Component key={index} {...item} />
            ))}
        </div>
    )
}
