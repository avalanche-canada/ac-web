import { useMemo } from 'react'
import isAfter from 'date-fns/is_after'
import * as ast from 'api/urls/ast'
import { useFetch } from 'hooks'
import { Memory } from 'components/fetch/Cache'

export function useProviders() {
    const [providers, pending] = useFetch(ast.providers(), CACHE)

    return [providers?.results, pending]
}

export function useCourses() {
    const [courses, pending] = useFetch(ast.courses(), CACHE)

    return [
        useMemo(() => {
            if (Array.isArray(courses?.results)) {
                const now = new Date()

                return courses.results.filter(course =>
                    isAfter(course.date_end, now)
                )
            }
        }, [courses]),
        pending,
    ]
}

const CACHE = new Memory()
