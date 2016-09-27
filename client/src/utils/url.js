import Url from 'url'

export const avalancheCanadaPathRegex = /avalanche.ca/

export function href(url) {
    if (avalancheCanadaPathRegex.test(url)) {
        const {path} = Url.parse(url)

        return path
    }

    return url
}
