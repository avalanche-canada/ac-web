import React, {Component, PropTypes, createElement} from 'react'
import {compose, componentFromProp, lifecycle, branch, renderComponent, setPropTypes, setDisplayName, withProps, mapProps, flattenProp, defaultProps} from 'recompose'
import {StaticPage, Generic, Content} from 'prismic/components/page'
import {getDocumentAndStatus} from 'selectors/prismic/utils'
import {prismic} from 'containers/connectors'

export function staticPage(uid, title, message) {
    const type = 'static-page'

    return compose(
        withProps({
            type,
            uid,
            title,
            message,
            params: {
                type,
                uid,
            }
        }),
        prismic(getDocumentAndStatus),
    )(StaticPage)
}

export function generic(uid, title) {
    return compose(
        withProps({
            uid,
            title,
            params: {
                type: 'generic',
                uid,
            }
        }),
        prismic(getDocumentAndStatus),
    )(Generic)
}

export function content(uid) {
    const type = 'static-page'

    return compose(
        withProps({
            uid,
            type,
            params: {
                type,
                uid,
            },
        }),
        prismic(getDocumentAndStatus),
    )(Content)
}
