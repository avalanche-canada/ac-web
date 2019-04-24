import { status } from 'services/fetch/utils'
import { clean } from 'utils/object'

export function mapToSizeFactory(width = 100, height = 100) {
    const transform = `c_fill,h_${height},w_${width}`
    const original = `c_fill,h_${600},w_${1000}`

    return function mapToSize({ public_id }) {
        return {
            original: `${RESOURCE_PREFIX}/${original}/${public_id}.png`,
            thumbnail: `${RESOURCE_PREFIX}/${transform}/${public_id}.png`,
        }
    }
}

export function getByTag(tag, options = {}) {
    const params = new URLSearchParams(clean({ max_results: 25, ...options }))
    const url = `${TAGS_PATH}/${tag.trim()}?${params.toString()}`

    return fetch(url).then(status)
}

// Constants
const RESOURCE_PREFIX = '//res.cloudinary.com/avalanche-ca/image/upload'
const TAGS_PATH = '/vendor/cloudinary/resources/image/tags'
