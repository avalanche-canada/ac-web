import { status } from 'services/fetch/utils'
import * as requests from './requests'

export async function getFeatures(dataset) {
    const response = await fetch(requests.features(dataset))

    return await status(response)
}

export const FORECAST_REGIONS = 'citdb89uw000i2op95hq2ruxf'
