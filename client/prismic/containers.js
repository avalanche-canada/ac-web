import identity from 'lodash/identity'
import * as urls from './urls'
import * as api from './api'
import request from 'utils/fetch'
import { FR } from 'constants/locale'
import { useCacheAsync, createKey } from 'hooks'

function useMasterRef() {
    const key = createKey('prismic', 'ref')
    const [ref = null] = useCacheAsync(api.ref, undefined, undefined, key)

    return ref
}

function useSearch(predicates, locale, options) {
    if (LANGUAGES.has(locale)) {
        Object.assign(options, LANGUAGES.get(locale))
    }

    // Use URL as key and params, so it does not trigger all the time
    const ref = useMasterRef()
    const url = ref ? urls.search(ref, predicates, options) : null
    const req = url ? request : empty

    return useCacheAsync(req, [url], undefined, url)
}

export function useDocument(predicates, locale, options) {
    const [data, ...rest] = useSearch(predicates, locale, options)

    return [data?.results?.[0], ...rest]
}

export function Document({ children = identity, predicates, locale, options }) {
    const [document, pending, error] = useDocument(predicates, locale, options)

    return children({ document, pending, error })
}

export function useDocuments(predicates, locale, options) {
    return useSearch(predicates, locale, options)
}

export function Documents({
    children = identity,
    predicates,
    locale,
    ...options
}) {
    const [data = {}, pending, error] = useDocuments(
        predicates,
        locale,
        options
    )

    return children({
        ...data,
        documents: data.results,
        pending,
        error,
    })
}

export function Tags({ children, type }) {
    const ref = useMasterRef()
    const params = [ref, type]
    const key = createKey('primic', 'tags', type)
    const fn = ref ? api.tags : empty
    const [tags = [], pending] = useCacheAsync(fn, params, undefined, key)

    return children({ tags, pending })
}

// Constants
const LANGUAGES = new Map([[FR, { lang: 'fr-ca' }]])
function empty() {
    return Promise.resolve()
}
