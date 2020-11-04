import * as requests from 'requests/api'
import { useCacheAsync, createKey } from '../'
import { useLanguage } from 'contexts/intl'

export function useMetadata() {
    const language = useLanguage()
    const params = [language]
    const key = createKey('metadata', params)

    return useCacheAsync(requests.metadata, params, undefined, key)
}
