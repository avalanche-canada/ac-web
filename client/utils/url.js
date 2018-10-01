export function href(url) {
    if (avalancheCanadaPathRegex.test(url)) {
        return url.replace(avalancheCanadaPathRegex, '') || '/'
    }

    return url
}

export function isExternal(path) {
    if (typeof path !== 'string') {
        return false
    }

    return isExternalRegExp.test(path)
}

export const avalancheCanadaPathRegex = /^(http|https):\/\/(www.|)avalanche.ca/
const isExternalRegExp = new RegExp('^(https|http)://')

export function forceHttps(url) {
    return typeof url === 'string' ? url.replace(/^http:/, 'https:') : url
}
