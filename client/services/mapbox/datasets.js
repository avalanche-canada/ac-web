import { status } from 'services/fetch/utils'
import * as requests from './requests'

export function getFeatures(dataset) {
    return fetch(requests.features(dataset)).then(status)
}

export const FORECAST_REGIONS = 'citdb89uw000i2op95hq2ruxf'
