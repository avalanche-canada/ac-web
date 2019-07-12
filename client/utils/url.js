import { clean } from 'utils/object'

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
export const isExternalRegExp = new RegExp('^(https|http)://')

export function forceHttps(url) {
    return typeof url === 'string' ? url.replace(/^http:/, 'https:') : url
}

export function build(path, params, base = document.location.origin) {
    let url = base + path

    if (params) {
        const search = new URLSearchParams(clean(params))

        url = `${url}?${search.toString()}`
    }

    return url
}
