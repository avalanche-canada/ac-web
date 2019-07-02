export function shareUrl(id) {
    return document.location.origin + path(id)
}

export function path(id) {
    return `/mountain-information-network/submissions/${id}`
}
