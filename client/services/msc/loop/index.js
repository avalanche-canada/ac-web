import { fetchStaticResource } from '~/api'

let METADATA = null
let PROMISE = null
const URL = 'weather-loops-metadata'

function handleMetadataFulfilled(data) {
    METADATA = data

    return data
}

export function fetchMetadata() {
    if (METADATA !== null) {
        return Promise.resolve(METADATA)
    }

    if (PROMISE === null) {
        PROMISE = fetchStaticResource(URL).then(handleMetadataFulfilled)
    }

    return PROMISE
}

export {
    isForecast,
    getNotes,
    computeUrls,
    computeForecastUrls,
    formatForecastUrl,
} from './url'
