export function pushNewLocation(newLocation, {router, location}) {
    router.push({
        ...location,
        ...newLocation,
    })
}

export function pushQuery(query, {router, location}) {
    router.replace({
        ...location,
        query: {
            ...location.query,
            ...query,
        }
    })
}

export function replaceQuery(query, {router, location}) {
    router.replace({
        ...location,
        query: {
            ...location.query,
            ...query,
        }
    })
}

export function replaceState(state, {router, location}) {
    router.replace({
        ...location,
        state: {
            ...location.state,
            ...state,
        }
    })
}

export function replaceStateAndQuery(state, query, {router, location}) {
    router.replace({
        ...location,
        query: {
            ...location.query,
            ...query,
        },
        state: {
            ...location.state,
            ...state,
        },
    })
}
