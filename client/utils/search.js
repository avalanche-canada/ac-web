import * as qs from 'querystring'
import { clean } from 'utils/object'
import { ASC, DESC, NONE } from 'constants/sortings'
import baseFormatDate from 'date-fns/format'
import baseParseDate from 'date-fns/parse'

const DATE = 'YYYY-MM-DD'

export function parse(search) {
    if (typeof search === 'string') {
        return qs.parse(search.replace(/^\?/, ''))
    }

    return {}
}

export function stringify(query = {}) {
    query = clean({ ...query })

    if (Object.keys(query).length === 0) {
        return null
    }

    for (let key in query) {
        if (query[key] instanceof Set) {
            query[key] = Array.from(query[key])
        }
        if (query[key] instanceof Date) {
            query[key] = formatDate(query[key])
        }
    }

    return '?' + qs.stringify(query)
}

export function assign(previous, next) {
    previous = typeof previous === 'string' ? parse(previous) : previous
    next = typeof next === 'string' ? parse(next) : next

    return clean(Object.assign({}, previous, next))
}

export function toSet(values) {
    if (values === undefined) {
        return
    }

    values = typeof values === 'string' ? [values] : values

    return new Set(values.map(trim).filter(Boolean))
}

function trim(string) {
    return string.trim()
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
