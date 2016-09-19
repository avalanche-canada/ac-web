
export function replaceQuery(query, {router, location}) {
    router.replace({
        ...location,
        query: {
            ...location.query,
            ...query,
        }
    })
}

export function pushNewLocation(newLocation, {router, location}) {
    router.push({
        ...location,
        ...newLocation,
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
