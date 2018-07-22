import { Predicates } from 'prismic'
import Axios from 'axios'
import { root, version } from './config.json'

let API = null
let API_PROMISE = null

const SEARCH = `/${version}/documents/search`

const axios = Axios.create({
    baseURL: root,
    validateStatus(status) {
        return (status >= 200 && status < 300) || status === 404
    },
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

export async function Query(predicates, options) {
    const api = await getApi()

    if (options && options.pageSize > MAX_PAGE_SIZE) {
        return all(predicates, options)
    }

    return query(api, options, predicates)
}

async function all(predicates, options) {
    let response = {}
    let documents = []
    let current = 1
    let nextPage = null

    do {
        const response = await Query(predicates, {
            ...options,
            page: current,
            pageSize: MAX_PAGE_SIZE,
        })

        current = response.page + 1
        nextPage = response.next_page

        documents = [...documents, ...response.results]
    } while (nextPage)

    return {
        ...response,
        results: documents,
    }
}

export async function tags(type) {
    const predicates = [Predicates.type(type)]
    const tags = new Set()
    let current = 1
    let nextPage = null

    do {
        const { results, page, next_page } = await Query(predicates, {
            page: current,
            pageSize: MAX_PAGE_SIZE,
            fetch: 'document.tags',
        })

        current = page + 1
        nextPage = next_page

        results.forEach(result => result.tags.forEach(tag => tags.add(tag)))
    } while (nextPage)

    return tags
}

// Constants
const MAX_PAGE_SIZE = 100
