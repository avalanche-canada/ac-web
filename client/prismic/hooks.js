import * as urls from './urls'
import * as api from './api'
import request from 'utils/fetch'
import { FR } from 'constants/locale'
import { useCacheAsync, createKey } from 'hooks/async'

export function useSearch({ predicates, locale, ...options }) {
    if (LANGUAGES.has(locale)) {
        Object.assign(options, LANGUAGES.get(locale))
    }

    // Use URL as key and params, so it does not trigger all the time!
    // That is the only one that uses URL
    // However there is an async search function that could be used
    const ref = useMasterRef()
    const url = ref[0] ? urls.search(ref[0], predicates, options) : null
    const req = url ? request : empty
    const search = useCacheAsync(req, [url], undefined, url)

    return merge(ref, search)
}

export function useDocuments(props) {
    const [data, ...rest] = useSearch(props)

    return [data?.results, ...rest]
}

export function useDocument(props) {
    const [[document] = [], ...rest] = useDocuments(props)

    return [document, ...rest]
}

export function useTags(type) {
    const key = createKey('primic', 'tags', type)
    const ref = useMasterRef()
    const params = [ref[0], type]
    const fn = ref[0] ? api.tags : empty
    const tags = useCacheAsync(fn, params, undefined, key)

    return merge(ref, tags)
}

export function useDefinitions() {
    const key = createKey('primic', 'definitions')
    const ref = useMasterRef()
    const params = [ref[0]]
    const fn = ref[0] ? api.definitions : empty
    const definitions = useCacheAsync(fn, params, undefined, key)

    return merge(ref, definitions)
}

// Utils & constants
function useMasterRef() {
    return useCacheAsync(api.ref, undefined, undefined, 'prismic:ref')
}
const LANGUAGES = new Map([[FR, { lang: 'fr-ca' }]])
function empty() {
    return Promise.resolve()
}
function merge(...values) {
    return values.reduce(
        (value, current) => [
            current[0], // payload
            current[1] || value[1], // pending
            value[2] || current[2], // error
        ],
        []
    )
}
