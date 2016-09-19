// import {createSelector, createSelectorCreator, defaultMemoize} from 'reselect'
//
// const createLocationSelector = createSelectorCreator(
//     defaultMemoize,
//     (a, b) => a.pathname === b.pathname
// )

// export const getLocation = createLocationSelector(
//     (state, props) => props.location,
//     location => location
// )

export function getLocation(state, {location}) {
    return location
}

export function getRouter(state, {router}) {
    return router
}
