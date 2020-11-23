import * as React from 'react'
import formatDate from 'date-fns/format'
import parseDate from 'date-fns/parse'
import identity from 'lodash/identity'
import { useLocation } from 'router/hooks'
import { ASC, DESC, NONE } from 'constants/sortings'

export default function useParams(definition) {
    const { location } = useLocation()
    const params = React.useMemo(() => {
        const params = new URLSearchParams(location.search)
        const values = {}

        // Get all received params
        params.forEach(function(value, key) {
            if (key in values) {
                if (Array.isArray(values[key])) {
                    values[key].push(value) // Push to existing array
                } else {
                    values[key] = [values[key], value] // Create an array with the value
                }
            } else {
                values[key] = value // Start to push as a string
            }
        })

        // Add "empty" values, they are in the definition, but we have not received a param for it
        Object.entries(definition).forEach(([key, param]) => {
            if (key in values) {
                return
            }

            values[key] = param.format()
        })

        return Object.fromEntries(
            Object.entries(values).map(([key, value]) => [
                key,
                key in definition ? definition[key].parse(value) : value,
            ])
        )
    }, [location.search])

    function stringify(query) {
        function reducer(accumulator, [key, value]) {
            // null or undefined
            if (value == null) {
                return accumulator
            }

            if (key in definition) {
                value = definition[key].format(value)
            }

            if (Array.isArray(value)) {
                for (const valeur of value) {
                    if (valeur != null) {
                        accumulator.append(key, valeur)
                    }
                }
            } else if (value != null) {
                accumulator.append(key, value)
            }

            return accumulator
        }

        const newParams = new URLSearchParams()

        Object.entries({ ...params, ...query }).reduce(reducer, newParams)

        const string = newParams.toString()

        return string ? '?' + string : string
    }

    return [params, stringify]
}

// Params
const IdentityParam = {
    parse: identity,
    format: identity,
}
export const NumberParam = {
    parse(string) {
        if (string == null) {
            return
        }

        return Number(string)
    },
    format: identity,
}
export const BooleanParam = {
    parse(string) {
        if (string === '0' || string === 'false') {
            return false
        }

        return Boolean(string)
    },
    format: identity,
}
export const StringParam = IdentityParam
export const ArrayParam = {
    parse(values) {
        return Array.isArray(values) ? values : [values]
    },
    format(values) {
        if (!Array.isArray(values)) {
            return []
        }

        return values.filter(value => value != null)
    },
}
export const SetParam = {
    parse(values) {
        return new Set(ArrayParam.parse(values))
    },
    format(values) {
        if (!values) {
            return []
        }

        return Array.from(values)
    },
}
export const DateParam = {
    parse(string) {
        return string && parseDate(string, DATE)
    },
    format(date) {
        return date && formatDate(date, DATE)
    },
}
// TODO Remove the need for "+" for ASC sorts.
// However, it does not work in AST pages, need to investigate!
export const SortingParam = {
    parse(sorting) {
        if (typeof sorting !== 'string') {
            return [null, NONE]
        }

        switch (sorting.charAt(0)) {
            case '-':
                return [sorting.substring(1), DESC]
            case '+':
                return [sorting.substring(1), ASC]
            default:
                return [null, NONE]
        }
    },
    format(sorting) {
        if (!Array.isArray(sorting)) {
            return
        }

        const [name, order] = sorting

        switch (order) {
            case DESC:
                return '-' + name
            case ASC:
                return '+' + name
        }
    },
}
export const PageParam = {
    parse(string) {
        const page = NumberParam.parse(string)

        return page < 2 ? undefined : page
    },
    format(page) {
        return page < 2 ? undefined : page
    },
}

// Constants
const DATE = 'YYYY-MM-DD'
