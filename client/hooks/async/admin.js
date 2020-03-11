import { users } from 'requests/admin'
import { useCacheAsync, createKey } from './'
import Accessor from 'services/auth/accessor'

export function useUsers(username, page) {
    return useCacheAsync(
        users,
        [Accessor.idToken, username, page],
        undefined,
        createKey('admin', 'users', username)
    )
}
