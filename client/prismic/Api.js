import { Predicates } from 'prismic'
import Axios from 'axios'
import { root, version } from './config.json'

let API = null
let API_PROMISE = null

const SEARCH = `/${version}/documents/search`

const axios = Axios.create({
    baseURL: root,
    paramsSerializer(params) {
        return Object.keys(params)
            .filter(key => Boolean(params[key]))
            .map(key => {
                const value = params[key]

                if (Array.isArray(value)) {
                    const content = value.map(encodeURIComponent).join(',')

                    return `${key}=%5B${content}%5D`
                } else {
                    return `${key}=${encodeURIComponent(value)}`
                }
            })
            .join('&')
    },
})

function toQuery(predicate) {
    return Predicates.toQuery(predicate)
}

function getData(response) {
    return response.data
}

function getApi() {
    if (API) {
        return Promise.resolve(API)
    }

    if (API_PROMISE) {
        return API_PROMISE
    }

    API_PROMISE = axios.get(version).then(getData)

    return API_PROMISE.then(api => {
        API = api

        return api
    })
}

function query(api, options = {}, predicates) {
    const [{ ref }] = api.refs

    options = {
        params: {
            page: 1,
            ...options,
            q: `[${predicates.map(toQuery).join('')}]`,
            ref,
        },
    }

    return axios.get(SEARCH, options).then(getData)
}

export function Query(predicates, options) {
    return getApi().then(api => query(api, options, predicates))
}
