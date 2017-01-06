import React, {PropTypes, createElement} from 'react'
import {onlyUpdateForKeys} from 'recompose'
import {Loading, Error, Muted} from './Text'
import {trulyKeys} from 'utils/object'

const Components = new Map([
    ['isLoading', Loading],
    ['isError', Error],
])

Status.propTypes = {
    isLoading: PropTypes.bool,
    isError: PropTypes.bool,
    messages: PropTypes.shape({
        isLoading: PropTypes.string,
        isError: PropTypes.string,
    }),
}

function Status({isLoading, isError, messages = {}}) {
    const [key] = trulyKeys({isLoading, isError})

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

export default onlyUpdateForKeys(['isLoading', 'isError'])(Status)
