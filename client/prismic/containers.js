import identity from 'lodash/identity'
import * as urls from './urls'
import * as api from './api'
import request from 'utils/fetch'
import { FR } from 'constants/locale'
import { useCacheAsync, createKey } from 'hooks'

function useMasterRef() {
    const [ref = null] = useCacheAsync(api.ref, undefined, undefined, REF_KEY)

    return ref
}

function useSearch(predicates, locale, options) {
    if (LANGUAGES.has(locale)) {
        Object.assign(options, LANGUAGES.get(locale))
    }

    const ref = useMasterRef()
    const url = ref ? urls.search(ref, predicates, options) : null
    const req = url ? request : () => Promise.resolve()

    return useCacheAsync(req, [url], undefined, url)
}

export function Document({ children = identity, predicates, locale, options }) {
    const [data, pending, error] = useSearch(predicates, locale, options)

    return children({
        document: data?.results?.[0],
        pending,
        error,
    })
}

export function Documents({
    children = identity,
    predicates,
    locale,
    options,
}) {
    const [data, pending, error] = useSearch(predicates, locale, options)

    return children({
        document: data?.results,
        pending,
        error,
    })
}

export function Tags({ children, type }) {
    const ref = useMasterRef()
    const key = createKey('primic', 'tags', type)
    const [tags = [], pending] = useCacheAsync(
        api.tags,
        [ref, type],
        undefined,
        key
    )

    console.warn(tags)

    return children({ tags, pending })
}

// Constants
const LANGUAGES = new Map([[FR, { lang: 'fr-ca' }]])
const REF_KEY = createKey('prismic', 'ref')
