import * as requests from 'requests/api'
import { useCacheAsync, createKey } from '../'
import { useLanguage } from 'contexts/intl'
import { DateParam } from 'hooks/params'

export function useArea(id) {
    const language = useLanguage()
    const params = [language, id]
    const key = createKey('areas', params)

    return useCacheAsync(requests.area, params, undefined, key)
}

export function useAreas(date) {
    const language = useLanguage()
    const params = [language, date]
    const key = createKey('areas', language, DateParam.format(date))

    return useCacheAsync(requests.areas, params, undefined, key)
}
