import { useMemo } from 'react'

export function useSorting(collection, compare, reversed = false) {
    return useMemo(() => {
        if (typeof compare !== 'function') {
            return collection
        }

        const sorted = [...collection].sort(compare)

        return reversed ? sorted.reverse() : sorted
    }, [collection, compare, reversed])
}

export function usePagination(collection, page = 1, pageSize = 25) {
    return useMemo(() => {
        const begin = (page - 1) * pageSize
        const end = begin + pageSize

        return collection.slice(begin, end)
    }, [collection, page, pageSize])
}

export function useFilters(collection, predicates) {
    return useMemo(() => {
        return predicates.reduce(predicateReducer, collection)
    }, [collection, predicates])
}

// Utils
function predicateReducer(collection, predicate) {
    return collection.filter(predicate)
}
