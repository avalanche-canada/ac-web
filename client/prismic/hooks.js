import * as api from './api'
import { useAsync } from 'hooks'

export function useDocuments(params) {
    return useAsync(api.all, params)
}
