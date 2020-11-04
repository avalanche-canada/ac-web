import * as urls from './urls'
import * as api from './api'
import request, { empty } from 'utils/fetch'
import { FR, EN } from 'constants/locale'
import { useCacheAsync, createKey } from 'hooks/async'
import { generic } from 'prismic/params'
import { useLocale } from 'contexts/intl'
import { truth } from 'utils/function'

export function useSearch({ predicates, ...options }) {
    // Use URL as key and params, so it does not trigger all the time!
    // That is the only one that uses URL
    // However there is an async search function that could be used
    const { locale } = useLocale()
    const language = LANGUAGES.get(locale)
    const ref = useMasterRef()
    let finder = truth

    if (locale === FR && !options.lang) {
        // Not all Prismic documents have been translateed, so
        // we are loading documents for all languages and filter
        // to the language afterward. In case a given document has not
        // been translated, the English will be returned
        options.lang = '*'

        finder = ({ lang, alternate_languages }) => {
            if (lang === language) {
                return true
            }

            return !alternate_languages.find(finder)
        }
    }

    const url = ref[0] ? urls.search(ref[0], predicates, options) : null
    const req = url ? request : empty
    const search = useCacheAsync(req, [url], undefined, url)
    const state = merge(ref, search)

    if (Array.isArray(state[0]?.results)) {
        const [{ results, ...data }, ...payload] = state

        return [
            {
                ...data,
                results: results.filter(finder),
            },
            ...payload,
        ]
    }

    return state
}

export function useDocuments(props) {
    const [data, ...rest] = useSearch(props)

    return [data?.results, ...rest]
}

export function useDocument(props) {
    const [documents, ...rest] = useDocuments(props)

    return [documents?.[0], ...rest]
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

export function useGeneric(uid) {
    return useDocument(generic(uid))
}

// Utils & constants
const LANGUAGES = new Map([[FR, 'fr-ca'], [EN, 'en-us']])

function useMasterRef() {
    return useCacheAsync(api.ref, undefined, undefined, 'prismic:ref')
}
function merge(...values) {
    return values.reduce(
        (value, current) => [
            current[0], // the last payload that we care, see calls above!
            current[1] || value[1] || !current[0], // pending
            value[2] || current[2], // error
        ],
        []
    )
}
