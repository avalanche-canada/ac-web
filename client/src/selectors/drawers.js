import {createSelector} from 'reselect'

const isMapRoute = /^\/map\//i
const isExternalForecastRoute = /(\/forecasts\/little-yoho|\/forecasts\/banff-yoho-kootenay|\/forecasts\/vancouver-island|\/forecasts\/jasper|\/forecasts\/waterton|\/forecasts\/chic-chocs|\/forecasts\/glacier)/i
const {innerWidth} = window
function isPrimaryOpened(pathname) {
    return isMapRoute.test(pathname) && !isExternalForecastRoute.test(pathname)
}

const PRIMARY = {
    open: false,
    width: Math.min(innerWidth, 500),
}

export const getPrimary = createSelector(
    (state, props) => props.location.pathname,
    pathname => ({
        ...PRIMARY,
        open: isPrimaryOpened(pathname),
    })
)

const SECONDARY = {
    open: false,
    width: Math.min(innerWidth, 500),
}

export const getSecondary = createSelector(
    (state, props) => props.location.query.panel,
    panel => ({
        ...SECONDARY,
        open: Boolean(panel)
    })
)

export {getMenu} from 'reducers/drawers'
