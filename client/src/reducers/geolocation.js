import {handleAction} from 'redux-actions'
import {GEOLOCATION_POSITION_CHANGED} from 'actions/geolocation'
import {getPayload} from 'reducers/utils'

export default handleAction(GEOLOCATION_POSITION_CHANGED, getPayload, null)

export function getGeolocation(state) {
    return state.geolocation
}
