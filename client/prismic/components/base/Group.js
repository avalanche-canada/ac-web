import React, { createElement } from 'react'
import PropTypes from 'prop-types'

Group.propTypes = {
    value: PropTypes.array.isRequired,
    Component: PropTypes.object.isRequired,
}

export default function Group({ value, Component, ...props }) {
    return (
        <div {...props}>
            {value.map((item, index) =>
                createElement(Component, {
                    key: index,
                    ...item,
                })
            )}
        </div>
    )
}
