import * as api from './api'
import { useAsync } from 'utils/react/hooks'

export function useDocuments(params) {
    return useAsync(api.all, params)
}
