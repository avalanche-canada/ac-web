import { build, path } from 'utils/url'
import {
    EVENT,
    BLOG,
    NEWS,
    GENERIC,
    STATIC_PAGE,
    DEFINITION,
    TUTORIAL_ARTICLE,
    FATAL_ACCIDENT,
} from 'constants/prismic'

// TODO Cleanup, I do not

export const feed = {
    uid(type, uid) {
        return build(path(FEED_PATHS.get(type), uid), undefined, '/')
    },
    tags(type, tags) {
        return build(FEED_PATHS.get(type), { tags }, '/')
    },
}

export function pathname({ type, uid, lang }) {
    switch (type) {
        case EVENT:
        case BLOG:
        case NEWS:
            return feed.uid(type, uid)
        case GENERIC:
        case STATIC_PAGE:
            return `/pages/${type}/${uid}`
        case TUTORIAL_ARTICLE:
            return `/${lang === 'fr-ca' ? 'tutoriel' : 'tutorial'}?uid=${uid}`
        case DEFINITION:
            return `/glossary#${uid}`
        case FATAL_ACCIDENT:
            return `/map?panel=fatal-accidents/${uid}`
        default:
            return `/pages/${type}/${uid}`
    }
}

// Constants
const FEED_PATHS = new Map([[NEWS, 'news'], [BLOG, 'blogs'], [EVENT, 'events']])
