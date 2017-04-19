import format from 'date-fns/format'
import identity from 'lodash/identity'
import {DESC, NONE} from '~/constants/sortings'

function merge(location, {query = {}, state = {}, ...rest}) {
    return {
        ...location,
        ...rest,
        query: {
            ...location.query,
            ...query,
        },
        state: {
            ...location.state,
            ...state,
        },
    }
}

export function push(newLocation, {router, location}) {
    return router.push(merge(location, newLocation))
}

export function replace(newLocation, {router, location}) {
    return router.replace(merge(location, newLocation))
}

export function valueHandlerFactory(name, format = identity) {
    return props => value => {
        push({
            query: {
                // "undefined" removes the query params
                [name]: value === null ? undefined : format(value)
            }
        }, props)
    }
}

export function sortingHandlerFactory(propName = 'sorting') {
    return props => (name, order = NONE) => {
        replace({
            query: {
                [propName]: order === NONE ? undefined : `${order === DESC ? '-' : ''}${name}`
            }
        }, props)
    }
}

function asArray(values) {
    if (typeof values === 'string') {
        values = [values]
    }

    return Array.from(new Set(values))
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
