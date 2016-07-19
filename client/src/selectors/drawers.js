import {createSelector} from 'reselect'

export function getPrimary(state, {router}) {
    const open = router.isActive('/map/forecasts') || router.isActive('/map/hot-zone-reports')

    return {
        open
    }
}

export function getSeconday() {
    return {
        open: false
    }
}
