import { api } from './config.json'
import * as urls from './urls'
import * as params from './params'
import request from 'utils/fetch'

export async function ref() {
    const { refs } = await request(api)

    return refs.find(({ isMasterRef }) => isMasterRef).ref
}

export async function tags(ref, type) {
    const { predicates, ...options } = params.tags(type)
    const documents = (await all(ref, predicates, options)) || []

    return new Set(
        documents
            .map(({ tags }) => tags)
            .flat()
            .sort(sorter)
    )
}

export async function definitions(ref) {
    const { predicates, ...options } = params.glossary.definitions()
    const definitions = await all(ref, predicates, options)

    return definitions || []
}

// Utils
// TODO Try to use in prismic/hooks
function search(ref, predicates, options) {
    if (!ref) {
        return Promise.resolve()
    }

    const url = urls.search(ref, predicates, options)

    return request(url)
}
async function all(ref, predicates, options = {}) {
    let { results, total_pages } = await search(ref, predicates, options)

    for (let page = 2; page <= total_pages; page++) {
        const payload = await search(ref, predicates, { ...options, page })

        results = results.concat(payload.results)
    }

    return results
}
function sorter(a, b) {
    return a.localeCompare(b, 'en', { sensitivity: 'base' })
}
