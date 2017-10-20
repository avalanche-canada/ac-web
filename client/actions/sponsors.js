import { createAction } from 'redux-actions'
import { fetchStaticResource } from 'api'
import { getSponsors } from 'getters/sponsors'
import { createDelayedAction } from 'utils/redux'

export const GET_SPONSORS = 'GET_SPONSORS'

export const loadSponsors = createDelayedAction(
    state => (Object.keys(getSponsors(state) || {}).length > 0 ? 9999 : 1),
    createAction(GET_SPONSORS, () => fetchStaticResource('sponsors'))
)
