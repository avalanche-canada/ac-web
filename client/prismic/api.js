import * as urls from './urls'
import { status } from 'services/fetch/utils'

async function getRef() {
    const { refs } = await fetch(urls.api()).then(status)

    return refs.find(({ isMasterRef }) => isMasterRef).ref
}

export async function search(predicates, options) {
    const ref = await getRef()
    const url = urls.search(ref, predicates, options)

    return await fetch(url).then(status)
}

export async function all({ predicates, ...options }) {
    let { results, next_page, page } = await search(predicates, options)

    while (next_page) {
        const payload = await search(predicates, { ...options, page: page + 1 })

        results = [...results, ...payload.results]
        next_page = payload.next_page
        page = payload.page
    }

    return results
}

export async function tags(type) {
    const documents = await all(type)

    return new Set(documents.map(({ tags }) => tags).flat())
}