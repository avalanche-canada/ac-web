import { useMemo } from 'react'
import * as api from './api'
import { useCacheAsync } from 'hooks'

export function useDocuments(params) {
    // TODO Big hack so it does not refetch!!
    const parameters = useMemo(() => [params], [JSON.stringify(params)])

    return useCacheAsync(api.all, parameters, undefined, 'documents')
}
