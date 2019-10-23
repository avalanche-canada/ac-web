import { useMemo } from 'react'
import formatDate from 'date-fns/format'
import identity from 'lodash/identity'
import { useLocation } from 'router/hooks'
import { ASC, DESC, NONE } from 'constants/sortings'

export function useParams(definition) {
    const { location } = useLocation()
    const values = useMemo(() => {
        const params = new URLSearchParams(location.search)
        const values = {}

        params.forEach(function(value, key) {
            if (key in values) {
                if (Array.isArray(values[key])) {
                    values[key].push(value) // Push to existing array
                } else {
                    values[key] = [values[key], value] // Create an array
                }
            } else {
                values[key] = value // Start to push a string
            }
        })

        return Object.fromEntries(
            Object.entries(values).map(([key, value]) => [
                key,
                key in definition ? definition[key].parse(value) : value,
            ])
        )
    }, [location.search])
    function stringify(query) {
        const params = Object.entries(query).reduce((params, [key, value]) => {
            // null or undefined
            if (value == null) {
                return params
            }

            if (key in definition) {
                value = definition[key].serialize(value)
            }

            if (Array.isArray(value)) {
                for (const valeur of value) {
                    params.append(key, valeur)
                }
            } else {
                params.append(key, value)
            }
        }, new URLSearchParams())
        const string = params.toString()

        return string ? '?' + string : string
    }

    return [values, stringify]
}

// Params
export const IdentityParam = {
    parse: identity,
    serialize: identity,
}
export const NumberParam = {
    parse(value) {
        if (value === undefined) {
            return
        }

        return Number(value)
    },
    serialize: identity,
}
export const BooleanParam = {
    parse: Boolean,
    serialize: identity,
}
export const StringParam = IdentityParam
export const ArrayParam = {
    parse(values) {
        return Array.isArray(values) ? values : [values]
    },
    serialize: identity,
}
export const SetParam = {
    parse(values) {
        return new Set(ArrayParam.parse(values))
    },
    serialize(values) {
        return Array.from(values)
    },
}
export const DateParam = {
    parse(string) {
        return string ? new Date(string) : string
    },
    serialize(date) {
        return date ? formatDate(date, 'YYYY-MM-DD') : date
    },
}
export const SortingParam = {
    parse(sorting) {
        if (typeof sorting !== 'string') {
            return [null, NONE]
        }

        switch (sorting.charAt(0)) {
            case '+':
                return [sorting.substring(1), ASC]
            case '-':
                return [sorting.substring(1), DESC]
            default:
                return [null, NONE]
        }
    },
    serialize(sorting) {
        if (!Array.isArray(sorting)) {
            return undefined
        }

        const [name, order] = sorting

        switch (order) {
            case ASC:
                return '+' + name
            case DESC:
                return '-' + name
        }
    },
}
