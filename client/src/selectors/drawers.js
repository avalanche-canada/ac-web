import {createSelector} from 'reselect'
import {getWidth} from 'getters/map'

const isMapRoute = /^\/map\//i
const isExternalForecastRoute = /(\/forecasts\/little-yoho|\/forecasts\/banff-yoho-kootenay|\/forecasts\/vancouver-island|\/forecasts\/jasper|\/forecasts\/waterton|\/forecasts\/chic-chocs|\/forecasts\/glacier)/i
function isPrimaryOpened(pathname) {
    return isMapRoute.test(pathname) && !isExternalForecastRoute.test(pathname)
}

// TODO: Move to reducer when move to redux-little-router and create action

export const getPrimary = createSelector(
    (state, props) => props.location.pathname,
    getWidth,
    (pathname, width) => ({
        open: isPrimaryOpened(pathname),
        width: Math.min(width, 500),
    })
)

export const getSecondary = createSelector(
    (state, props) => props.location.query.panel,
    getWidth,
    (panel, width) => ({
        open: Boolean(panel),
        width: Math.min(width, 500),
    })
)
