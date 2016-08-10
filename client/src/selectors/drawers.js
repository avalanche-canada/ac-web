import {createSelector} from 'reselect'
import {getLocation} from 'selectors/utils'
import {getSchemaByKey} from 'api/schemas'

const isPrimaryOpened = /^\/map\//i

const PRIMARY = {
    open: false,
    width: 500,
}

export const getPrimary = createSelector(
    getLocation,
    location => ({
        ...PRIMARY,
        open: isPrimaryOpened.test(location.pathname),
    })
)

const SECONDARY = {
    open: false,
    width: 350,
    schema: null,
    id: null,
}

export const getSecondary = createSelector(
    getLocation,
    location => {
        const {panel} = location.query

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
