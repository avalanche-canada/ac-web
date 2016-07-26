import {createSelector} from 'reselect'
import {getMenu as getMenuReducer} from 'reducers/drawers'

function getPrimaryOpen(state, {router}) {
    return router.isActive('/map/forecasts') ||
           router.isActive('/map/hot-zone-reports')
}

function getSecondaryOpen(state, {router}) {
    const pathname = '/map'

    return router.isActive({
        pathname,
        query: {
            drawer: 'test'
        }
    })
}

export const getPrimary = createSelector(
    getPrimaryOpen,
    open => ({
        open,
        width: 500,
    })
)

export const getSecondary = createSelector(
    getSecondaryOpen,
    open => ({
        open,
        width: 350,
    })
)

export function getMenu(state, props) {
    const {open} = getMenuReducer(state)

    return {
        open
    }
}
