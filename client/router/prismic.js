import { appendParams, path } from 'utils/url'
import {
    EVENT,
    BLOG,
    NEWS,
    DEFINITION,
    TUTORIAL_ARTICLE,
    FATAL_ACCIDENT,
} from 'constants/prismic'

// TODO Cleanups!

export const feed = {
    uid(type, uid) {
        return path(feed.type(type), uid)
    },
    tags(type, tags) {
        return appendParams(feed.type(type), { tags })
    },
    type(type) {
        return FEED_PATHS_BY_TYPE.get(type)
    },
}

export function pathname({ type, uid, lang }) {
    switch (type) {
        case EVENT:
        case BLOG:
        case NEWS:
            return feed.uid(type, uid)
        case TUTORIAL_ARTICLE: {
            const path = lang === 'fr-ca' ? '/tutoriel' : '/tutorial'

            return appendParams(path, { uid })
        }
        case DEFINITION:
            return `/glossary#${uid}`
        case FATAL_ACCIDENT:
            return `/map?panel=fatal-accidents/${uid}`
        default:
            return path('/pages', type, uid)
    }
}

// Constants
const FEED_PATHS_BY_TYPE = new Map([
    [NEWS, '/news'],
    [BLOG, '/blogs'],
    [EVENT, '/events'],
])
