import React, {PropTypes, createElement} from 'react'
import {classify} from 'utils/string'
import {captureException} from 'services/raven'

Slice.propTypes = {
    type: PropTypes.string.isRequired,
    label: PropTypes.string,
    content: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.string,
    ]).isRequired,
}

export default function Slice({type, ...props}) {
    type = classify(type)

    try {
        const module = require(`./${type}`)

        return createElement(module.default, props)
    } catch (error) {
        const message = `Component for ${type} not supported. Rendering will be ignored.`

        console.error(error)
        
        captureException(new Error(error, message))

        return error
    }
}
