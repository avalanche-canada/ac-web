import * as url from 'utils/url'

export function shareUrl(id) {
    return document.location.origin + submission(id)
}

// TODO Look of we could use a bit more these util functions

export function path(...paths) {
    return url.path('/mountain-information-network', ...paths)
}

export function submission(id) {
    return path('submissions', id)
}
