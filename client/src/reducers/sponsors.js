import {handleAction} from 'redux-actions'
import {SPONSORS_SUCCESS} from 'actions/sponsors'
import {getPayload} from 'reducers/utils'

export default handleAction(SPONSORS_SUCCESS, getPayload, null)

export function getSponsors(state) {
    return state.sponsors
}
