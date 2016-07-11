import React, {PropTypes, createElement} from 'react'
import {classify} from 'utils/string'

Slice.propTypes = {
    type: PropTypes.string.isRequired,
    label: PropTypes.string,
    content: PropTypes.object.isRequired,
}

export default function Slice({type, label, content}) {
    const component = require(`./${classify(type)}`).default

    if (!component) {
        throw new Error(`Component for ${type} not supported.`)
    }

    return createElement(component, {content, label})
}
