import React, {PropTypes} from 'react'
import {getContext, withContext} from 'recompose'

const contextTypes = {
    session: PropTypes.object.isRequired
}

export function getSession(BaseComponent) {
    return getContext(contextTypes, BaseComponent)
}

export function withSession(BaseComponent) {
    return withContext(
        contextTypes,
        props => ({
            session: props.session
        }),
        BaseComponent)
}
