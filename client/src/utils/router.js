import {HeaderCellOrders} from 'components/table'
import identity from 'lodash/identity'

const {NONE, DESC} = HeaderCellOrders

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
                [name]: format(value)
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
    return typeof values === 'string' ? new Set([values]) : values
}

export function arrayValueHandlerFactory(name) {
    return valueHandlerFactory(name, asArray)
}
