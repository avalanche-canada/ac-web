import { clean } from 'utils/object'

export function href(url) {
    if (isAvalancheCanada(url)) {
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

export function isAvalancheCanada(path) {
    if (typeof path !== 'string') {
        return false
    }

    return avalancheCanadaPathRegex.test(path)
}

const avalancheCanadaPathRegex = /^(http|https):\/\/(www.|)avalanche.ca/
const isExternalRegExp = new RegExp('^(https|http)://')

export function forceHttps(url) {
    return typeof url === 'string' ? url.replace(/^http:/, 'https:') : url
}

export function build(path, params, base = document.location.origin) {
    return appendParams(base + path, params)
}

export function appendParams(url, params) {
    if (!params) {
        return url
    }

    const search =
        params instanceof URLSearchParams
            ? params
            : new URLSearchParams(clean(params))

    return [url, search.toString()].filter(Boolean).join('?')
}

export function path(...chunks) {
    return chunks.filter(chunk => chunk != null).join('/')
}
