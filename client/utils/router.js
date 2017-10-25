import { createElement } from 'react'
import { Route } from 'react-router-dom'
import format from 'date-fns/format'
import identity from 'lodash/identity'
import { DESC, NONE } from 'constants/sortings'
import { assign } from './location'

function merge({ history, location }, override, push = false) {
    const loc = assign(location, override)

    return push ? history.push(loc) : history.replace(loc)
}

export function replace(props, override) {
    return merge(props, override)
}

export function push(props, override) {
    return merge(props, override, true)
}

export function valueHandlerFactory(name, format = identity) {
    return props => value =>
        push(props, {
            search: {
                [name]: value === null ? undefined : format(value),
            },
        })
}

export function sortingHandlerFactory(propName = 'sorting') {
    return props => (name, order = NONE) =>
        merge(props, {
            search: {
                [propName]:
                    order === NONE
                        ? undefined
                        : `${order === DESC ? '-' : ''}${name}`,
            },
        })
}

function asArray(values) {
    if (typeof values === 'string') {
        values = [values]
    }

    if (Array.isArray(values)) {
        values = new Set(values) // Remove the duplicates
    }

    return Array.from(values)
}

export function arrayValueHandlerFactory(name) {
    return valueHandlerFactory(name, asArray)
}

function formatDate(date) {
    return date ? format(date, 'YYYY-MM-DD') : undefined
}

export function dateValueHandlerFactory(name) {
    return valueHandlerFactory(name, formatDate)
}

export function dateRangeValueHandlerFactory(
    from = 'from',
    to = 'to',
    push = false
) {
    return props => value => {
        const search = {
            [from]: formatDate(value[from], 'YYYY-MM-DD'),
            [to]: formatDate(value[to], 'YYYY-MM-DD'),
        }

        return merge(props, { search }, push)
    }
}
