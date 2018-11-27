import { get } from 'services/fetch/requests'

export function metadata() {
    return get('/api/features/metadata')
}
