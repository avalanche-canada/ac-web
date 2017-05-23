import get from 'lodash/get'

const EVENT = 'event'
const BLOG = 'blog'
const NEWS = 'news'
const GENERIC = 'generic'
const STATIC_PAGE = 'static-page'

export function title(document) {
    const type = get(document, 'type')

    switch (type) {
        case EVENT:
        case BLOG:
        case NEWS:
        case GENERIC:
        case STATIC_PAGE:
            return get(document, ['data', type, 'title', 'value'])
        default:
            throw new Error(
                `Can not compute a title from Prismic document of type "${type}".`
            )
    }
}

export function pathname({ type, uid }) {
    switch (type) {
        case EVENT:
            return `/events/${uid}`
        case BLOG:
            return `/blogs/${uid}`
        case NEWS:
            return `/news/${uid}`
        case GENERIC:
        case STATIC_PAGE:
            return `/pages/${type}/${uid}`
        default:
            throw new Error(
                `Can not compute a pathname from Prismic document or props "${type}" & "${uid}".`
            )
    }
}
