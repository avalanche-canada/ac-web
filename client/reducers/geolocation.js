import { handleAction } from 'redux-actions'
import { GEOLOCATION_POSITION_CHANGED } from 'actions/geolocation'

export default handleAction(
    GEOLOCATION_POSITION_CHANGED,
    (state, { payload }) => payload,
    null
)
