import React, {PropTypes, createElement} from 'react'
import {classify} from 'utils/string'

Slice.propTypes = {
    type: PropTypes.string.isRequired,
    label: PropTypes.string,
    content: PropTypes.object.isRequired,
}

export default function Slice({type, label, content}) {
    const module = require(`./${classify(type)}`)

    if (!module || !module.default) {
        throw new Error(`Component for ${type} not supported.`)
    }

    return createElement(module.default, {content, label})
}
