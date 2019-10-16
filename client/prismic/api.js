import * as urls from './urls'
import * as params from './params'
import request from 'utils/fetch'

export async function ref() {
    const { refs } = await request(urls.api())

    return refs.find(({ isMasterRef }) => isMasterRef).ref
}

export function search(ref, predicates, options) {
    if (!ref) {
        return Promise.resolve()
    }

    const url = urls.search(ref, predicates, options)

    return request(url)
}

export async function all(ref, predicates, options = {}) {
    let { results, next_page, page } = await search(ref, predicates, options)

    while (next_page) {
        const payload = await search(ref, predicates, {
            ...options,
            page: page + 1,
        })

        results = [...results, ...payload.results]
        next_page = payload.next_page
        page = payload.page
    }

    return results
}

export async function tags(ref, type) {
    const documents = await all(ref, params.tags(type))

    return new Set(
        documents
            .map(({ tags }) => tags)
            .flat()
            .sort(sorter)
    )
}

// Utils
function sorter(a, b) {
    return a.localeCompare(b, 'en', { sensitivity: 'base' })
}
