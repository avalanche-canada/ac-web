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
