import React, {PropTypes, createElement} from 'react'
import {classify} from 'utils/string'

Slice.propTypes = {
    type: PropTypes.string.isRequired,
    label: PropTypes.string,
    content: PropTypes.object.isRequired,
}

export default function Slice({type, ...props}) {
    type = classify(type)

    try {
        const module = require(`./${type}`)

        return createElement(module.default, props)
    } catch (e) {
        console.error(`Component for ${type} not supported. Rendering will be ignored.`)

        return null
    }
}
