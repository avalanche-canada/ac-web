import Axios, {defaults} from 'axios'

const resourcePrefix = 'http://res.cloudinary.com/avalanche-ca/image/upload'
const api = Axios.create({
    baseURL: 'http://avalanche.ca/vendor/cloudinary/resources/image/tags/'
})
const THUMBNAIL_SIZE = 50

export function mapToSizeFactory(width = THUMBNAIL_SIZE, height = THUMBNAIL_SIZE) {
    const transform = `c_fill,h_${height},w_${width}`
    const original = `c_fill,h_${600},w_${1000}`

    return function mapToSize({public_id, url}) {
        return {
            original: `${resourcePrefix}/${original}/${public_id}.png`,
            thumbnail: `${resourcePrefix}/${transform}/${public_id}.png`,
        }
    }
}

const OPTIONS = {
    max_results: 50,
}

export function getByTag(tag, options = {}) {
    const params = {
        ...OPTIONS,
        ...options,
    }
    const {max_results, next_cursor} = params
    const config = {
        params: {
            max_results,
            next_cursor
        }
    }

    return api.get(tag, config).then(result => result.data)
}
