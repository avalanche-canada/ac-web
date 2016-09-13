
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
