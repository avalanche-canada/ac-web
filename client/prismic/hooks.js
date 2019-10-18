import * as urls from './urls'
import * as api from './api'
import request from 'utils/fetch'
import { FR } from 'constants/locale'
import { useCacheAsync, createKey } from 'hooks/async'

function useMasterRef() {
    const key = createKey('prismic', 'ref')
    const [ref = null] = useCacheAsync(api.ref, undefined, undefined, key)

    return ref
}

export function useSearch({ predicates, locale, ...options }) {
    if (LANGUAGES.has(locale)) {
        Object.assign(options, LANGUAGES.get(locale))
    }

    // Use URL as key and params, so it does not trigger all the time
    const ref = useMasterRef()
    const url = ref ? urls.search(ref, predicates, options) : null
    const req = url ? request : empty

    return useCacheAsync(req, [url], undefined, url)
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
    const ref = useMasterRef()
    const params = [ref, type]
    const key = createKey('primic', 'tags', type)
    const fn = ref ? api.tags : empty

    return useCacheAsync(fn, params, undefined, key)
}

// Constants
const LANGUAGES = new Map([[FR, { lang: 'fr-ca' }]])
function empty() {
    return Promise.resolve()
}
