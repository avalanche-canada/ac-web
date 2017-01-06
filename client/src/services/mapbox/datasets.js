import {accessToken, username, api} from './config.json'
import Axios from 'axios'

const Datasets = Axios.create({
    baseURL: `${api}/datasets/v1/${username}`,
    params: {
        access_token: accessToken,
    },
})

export function list() {
    return Datasets.get()
}

export function features(dataset) {
    return Datasets.get(`${dataset}/features`)
}
