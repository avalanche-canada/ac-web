import { status } from 'utils/fetch'
import { build } from 'utils/url'

export function mapToSizeFactory(width = 100, height = 100) {
    const transform = `c_fill,h_${height},w_${width}`
    const original = `c_fill,h_${600},w_${1000}`
    const RESOURCE_PREFIX = '//res.cloudinary.com/avalanche-ca/image/upload'

    return function mapToSize({ public_id }) {
        return {
            original: `${RESOURCE_PREFIX}/${original}/${public_id}.png`,
            thumbnail: `${RESOURCE_PREFIX}/${transform}/${public_id}.png`,
        }
    }
}

export function getByTag(tag, options = {}) {
    const params = { max_results: 25, ...options }
    const path = `/vendor/cloudinary/resources/image/tags/${tag.trim()}`
    const url = build(path, params)

    return fetch(url).then(status)
}
