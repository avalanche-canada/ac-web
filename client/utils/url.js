import Url from 'url'

export const avalancheCanadaPathRegex = /^(http|https):\/\/(www.|)avalanche.ca/

export function href(url) {
    if (avalancheCanadaPathRegex.test(url)) {
        const { path } = Url.parse(url)

        return path
    }

    return url
}
