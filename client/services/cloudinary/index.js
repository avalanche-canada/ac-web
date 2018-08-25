import { status, clean } from 'services/fetch/utils'

export function mapToSizeFactory(
    width = THUMBNAIL_SIZE,
    height = THUMBNAIL_SIZE
) {
    const transform = `c_fill,h_${height},w_${width}`
    const original = `c_fill,h_${600},w_${1000}`

    return function mapToSize({ public_id }) {
        return {
            original: `${RESOURCE_PREFIX}/${original}/${public_id}.png`,
            thumbnail: `${RESOURCE_PREFIX}/${transform}/${public_id}.png`,
        }
    }
}

export async function getByTag(tag, options = {}) {
    const params = new URLSearchParams(clean({ ...OPTIONS, ...options }))
    const response = await fetch(
        `${TAGS_PATH}/${tag.trim()}?${params.toString()}`
    )

    return await status(response)
}

// Constants
const RESOURCE_PREFIX = '//res.cloudinary.com/avalanche-ca/image/upload'
const THUMBNAIL_SIZE = 50
const TAGS_PATH = '/vendor/cloudinary/resources/image/tags'
const OPTIONS = {
    max_results: 25,
}
