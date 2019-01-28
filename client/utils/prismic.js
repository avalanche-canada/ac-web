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

export function title(document = {}) {
    const { type } = document

    switch (type) {
        case EVENT:
        case BLOG:
        case NEWS:
            return document.title
        case GENERIC:
        case STATIC_PAGE:
            return document.data?.[type]?.title?.value
        default:
            throw new Error(
                `Can not compute a title from Prismic document of type "${type}".`
            )
    }
}

export function pathname({ type, uid, lang }) {
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
