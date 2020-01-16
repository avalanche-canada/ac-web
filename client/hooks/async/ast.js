import { providers, courses } from 'requests/ast'
import { useCacheAsync } from './'

export function useProviders() {
    return useCacheAsync(providers, undefined, undefined, 'ast:providers')
}

export function useCourses() {
    return useCacheAsync(courses, undefined, undefined, 'ast:courses')
}
