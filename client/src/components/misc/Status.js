import React, {PropTypes, createElement} from 'react'
import {onlyUpdateForPropTypes} from 'recompose'
import {Loading, Error, Muted} from './Text'
import {trulyKeys} from 'utils/object'

const Components = new Map([
    ['isLoading', Loading],
    ['isError', Error],
    ['isLoaded', Muted],
])

Status.propTypes = {
    isLoading: PropTypes.bool,
    isLoaded: PropTypes.bool,
    isError: PropTypes.bool,
    messages: PropTypes.shape({
        isLoading: PropTypes.string,
        isError: PropTypes.string,
        isLoaded: PropTypes.string,
    }),
}

function Status({isLoading, isError, isLoaded, messages = {}}) {
    const [key] = trulyKeys({isLoading, isError, isLoaded})

    if (!key) {
        return null
    }

    messages = {
        isLoading: 'Loading...',
        isError: 'An error happened...',
        ...messages
    }

    return createElement(Components.get(key) || Muted, null, messages[key])
}

export default onlyUpdateForPropTypes(Status)
