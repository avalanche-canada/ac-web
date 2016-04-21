import React, { PropTypes } from 'react'
import { getContext, withContext } from 'recompose'

const contextTypes = {
    router: PropTypes.object.isRequired
}

export function getRouter(BaseComponent) {
    return getContext(contextTypes, BaseComponent)
}

export function withRouter(BaseComponent) {
    return withContext(
        contextTypes,
        props => ({
            router: props.router
        }),
        BaseComponent)
}
