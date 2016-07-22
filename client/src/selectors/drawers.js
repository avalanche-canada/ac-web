import {createSelector} from 'reselect'
import {getMenu as getMenuReducer} from 'reducers/drawers'

export function getPrimary(state, {router}) {
    const open = router.isActive('/map/forecasts') || router.isActive('/map/hot-zone-reports')

    return {
        open,
        width: 500,
    }
}

export function getSeconday(state, {router, ...rest}) {
    const open = router.isActive({
        pathname: '/map',
        query: {
            drawer: 'test'
        }
    })

    return {
        open,
        width: 350,
    }
}



export function getMenu(state, props) {
    const {open} = getMenuReducer(state)

    return {
        open
    }
}
