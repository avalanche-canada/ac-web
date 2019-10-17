import { providers, courses } from 'requests/ast'
import { useCacheAsync, createKey } from 'hooks'

export function useProviders() {
    const key = createKey(KEY, 'providers')

    return useCacheAsync(providers, undefined, undefined, key)
}

export function useCourses() {
    const key = createKey(KEY, 'courses')

    return useCacheAsync(courses, undefined, undefined, key)
}

const KEY = 'ast'
