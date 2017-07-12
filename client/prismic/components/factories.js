import { compose, withProps } from 'recompose'
import { StaticPage, Generic } from '~/prismic/components/page'
import { makeGetDocumentAndStatus } from '~/selectors/prismic/utils'
import { prismic } from '~/containers/connectors'
import { GENERIC, STATIC_PAGE } from '~/constants/prismic'

export function create(type, uid, rest = {}) {
    return compose(
        withProps({
            type,
            uid,
            ...rest,
            params: {
                type,
                uid,
            },
        }),
        prismic(makeGetDocumentAndStatus)
    )
}

export function staticPage(uid, title, message) {
    return create(STATIC_PAGE, uid, { title, message })(StaticPage)
}

export function generic(uid, title) {
    return create(GENERIC, uid, { title })(Generic)
}
