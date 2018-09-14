import { ASC, DESC, NONE } from 'constants/sortings'
import baseFormatDate from 'date-fns/format'
import baseParseDate from 'date-fns/parse'

const DATE = 'YYYY-MM-DD'

export function parse(search) {
    const params = new URLSearchParams(search)
    const query = {}

    for (const [key, value] of params.entries()) {
        if (key in query) {
            if (Array.isArray(query[key])) {
                query[key].push(value)
            } else {
                query[key] = [query[key], value]
            }
        } else {
            query[key] = value
        }
    }

    return query
}

export function stringify(query = {}) {
    const params = Object.entries(query).reduce((params, [key, value]) => {
        if (value) {
            if (value instanceof Date) {
                params.append(key, formatDate(value))
            } else if (value instanceof Set || Array.isArray(value)) {
                for (const valeur of value) {
                    params.append(key, valeur)
                }
            } else {
                params.append(key, value)
            }
        }

        return params
    }, new URLSearchParams())

    return params.keys().next().done ? null : '?' + params.toString()
}

export function toSet(values) {
    if (values === undefined) {
        return new Set()
    }

    values = typeof values === 'string' ? [values] : values

    return new Set(Array.from(values, trim).filter(Boolean))
}

export function toNumber(value) {
    if (value === undefined) {
        return
    }

    return typeof value === 'string' ? Number(value) : value
}

export function formatSorting(sorting) {
    if (Array.isArray(sorting)) {
        const [name, order] = sorting

        switch (order) {
            case ASC:
                return '+' + name
            case DESC:
                return '-' + name
        }
    }

    return undefined
}

export function parseSorting(sorting) {
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
}

export function parseDate(string) {
    return string && baseParseDate(string, DATE)
}

export function formatDate(date) {
    return date && baseFormatDate(date, DATE)
}

// Utils
function trim(string) {
    return string.trim()
}
