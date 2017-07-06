import { Predicates } from '~/prismic'
import axios from 'axios'
import { endpoint } from './config.json'

let API = null
let API_PROMISE = null

function toQuery(predicate) {
    return Predicates.toQuery(predicate)
}

function getApi() {
    if (API) {
        return Promise.resolve(API)
    }

    if (API_PROMISE) {
        return API_PROMISE
    }

    API_PROMISE = axios.get(endpoint).then(response => response.data)
    // API_PROMISE = fetch(endpoint).then(response => response.json())

    return API_PROMISE.then(api => {
        API = api

        return api
    })
}

export function Query(predicates, options) {
    return getApi().then(api => query(api, options, predicates))
}

function query(api, options = {}, predicates) {
    const [{ ref }] = api.refs

    return axios
        .get(`${endpoint}/documents/search`, {
            params: {
                page: 1,
                ...options,
                q: `[${predicates.map(toQuery).join('')}]`,
                ref,
            },
        })
        .then(response => response.data)
}
