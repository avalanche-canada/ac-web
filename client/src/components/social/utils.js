import {FACEBOOK, TWITTER, GOOGLE_PLUS} from './Providers'

const shareUrlCreators = new Map([
    [FACEBOOK, url => `https://www.facebook.com/sharer.php?u=${url}`],
    [TWITTER, url => `https://twitter.com/intent/tweet?url=${url}`],
    [GOOGLE_PLUS, url => `https://plus.google.com/share?url=${url}`],
])


export function createShareUrl(provider, url) {
    if (shareUrlCreators.has(provider)) {
        return shareUrlCreators.get(provider)(url)
    }
}

export function createShareUrls(url) {
    return Array.from(shareUrlCreators).map(([provider, create]) => create(url))
}
