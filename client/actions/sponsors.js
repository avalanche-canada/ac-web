import { createAction } from 'redux-actions'
import isToday from 'date-fns/is_today'
import { fetchStaticResource } from 'api'
import { get } from 'getters/sponsors'
import * as promise from 'utils/promise'

export const GET_SPONSORS = 'GET_SPONSORS'

const load = createAction(GET_SPONSORS, () => fetchStaticResource('sponsors'))

export function loadSponsors() {
    return (dispatch, getState) => {
        const { data, lastUpdatedOn = 0 } = get(getState())
        let delay = 9999 // almost 10 seconds

        if (isToday(lastUpdatedOn)) {
            return
        }

        if (!data || Object.keys(data).length === 0) {
            delay = 1
        }

        promise.delay(delay).then(() => dispatch(load()))
    }
}
