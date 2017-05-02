import { compose, withProps } from 'recompose'
import { StaticPage, Generic, Content } from '~/prismic/components/page'
import { makeGetDocumentAndStatus } from '~/selectors/prismic/utils'
import { prismic } from '~/containers/connectors'

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
            },
        }),
        prismic(makeGetDocumentAndStatus)
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
            },
        }),
        prismic(makeGetDocumentAndStatus)
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
        prismic(makeGetDocumentAndStatus)
    )(Content)
}
