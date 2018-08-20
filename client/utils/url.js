import Url from 'url'

export const avalancheCanadaPathRegex = /^(http|https):\/\/(www.|)avalanche.ca/

export function href(url) {
    if (avalancheCanadaPathRegex.test(url)) {
        const { path } = Url.parse(url)

        return path
    }

    return url
}

export function isExternal(path) {
    if (typeof path !== 'string') {
        return false
    }

    return isExternalRegExp.test(path)
}

const isExternalRegExp = new RegExp('^(https|http)://')

export function forceHttps(url) {
    return typeof url === 'string' ? url.replace(/^http:/, 'https:') : url
}
