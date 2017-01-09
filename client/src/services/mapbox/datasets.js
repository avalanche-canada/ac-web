import {accessToken, username, api} from './config.json'
import Axios from 'axios'

const Datasets = Axios.create({
    baseURL: `${api}/datasets/v1/${username}`,
    params: {
        access_token: accessToken,
    },
})

export function getList() {
    return Datasets.get()
}

export function getFeatures(dataset) {
    return Datasets.get(`${dataset}/features`)
}

export const FORECAST_REGIONS = 'citdb89uw000i2op95hq2ruxf'
