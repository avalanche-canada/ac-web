import {createSelector} from 'reselect'
import {getSchemaByKey} from 'api/schemas'

const isPrimaryOpened = /^\/map\//i
const {innerWidth} = window

const PRIMARY = {
    open: false,
    width: Math.min(innerWidth, 500),
}

export const getPrimary = createSelector(
    (state, props) => props.location.pathname,
    pathname => ({
        ...PRIMARY,
        open: isPrimaryOpened.test(pathname),
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
