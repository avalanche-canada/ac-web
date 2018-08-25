import { Predicates } from 'prismic'
import { root, version } from './config.json'
import { status } from 'services/fetch/utils'

let API = null
let API_PROMISE = null

function getApi() {
    if (API) {
        return Promise.resolve(API)
    }

    if (API_PROMISE) {
        return API_PROMISE
    }

    API_PROMISE = fetch(`${root}/${version}`).then(status)

    return API_PROMISE.then(api => {
        API = api

        return api
    })
}

async function query(api, { orderings = [], ...options } = {}, predicates) {
    const { ref } = api.refs.find(ref => ref.isMasterRef)
    const params = serializeParams({
        page: 1,
        ...options,
        q: `[${predicates.map(Predicates.toQuery).join('')}]`,
        ref,
    })
    const url = `${root}/${version}/documents/search?${params}`
    const response = await fetch(url)

    return await status(response)
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

// Constants and utils
const MAX_PAGE_SIZE = 100
function serializeParams(params) {
    return Object.entries(params)
        .filter(tuple => Boolean(tuple[1]))
        .map(([key, value]) => {
            if (Array.isArray(value)) {
                const content = value.map(encodeURIComponent).join(',')

                return `${key}=[${content}]`
            } else {
                return `${key}=${encodeURIComponent(value)}`
            }
        })
        .join('&')
}
