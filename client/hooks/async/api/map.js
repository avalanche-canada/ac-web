import * as requests from 'requests/api'
import { useCacheAsync, createKey } from '../'
import { useLanguage } from 'contexts/intl'

export function useMarkers() {
    const language = useLanguage()
    const params = [language]
    const key = createKey('markers', params)

    return useCacheAsync(requests.markers, params, undefined, key)
}
