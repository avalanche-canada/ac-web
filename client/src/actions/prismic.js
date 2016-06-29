import {PRISMIC} from 'middleware/prismic'

export function loadForType(type, options) {
    return {
        type: PRISMIC,
        payload: {
            type,
            options,
        }
    }
}

export function loadForBookmark(bookmark) {
    return {
        type: PRISMIC,
        payload: {
            bookmark,
        }
    }
}

export function loadForUid(type, uid) {
    return {
        type: PRISMIC,
        payload: {
            type,
            uid,
        }
    }
}
