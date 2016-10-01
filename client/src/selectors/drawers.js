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
    width: Math.min(innerWidth, 350),
    schema: null,
    id: null,
}

export const getSecondary = createSelector(
    (state, props) => props.location.query.panel,
    panel => {
        if (panel) {
            const [key, id] = panel.split('/')

            return {
                ...SECONDARY,
                open: true,
                schema: getSchemaByKey(key),
                id,
            }
        }

        return SECONDARY
    }
)

export {getMenu} from 'reducers/drawers'
