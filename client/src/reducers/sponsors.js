import {handleActions} from 'redux-actions'
import typeToReducer from 'type-to-reducer'
import {combineReducers} from 'redux'
import {GET_SPONSORS, SET_ACTIVE_SPONSOR, RESET_ACTIVE_SPONSOR} from 'actions/sponsors'
import {getPayload} from '~/reducers/utils'
import {LocalStorage} from '~/services/storage'
import format from 'date-fns/format'

export default combineReducers({
    data: typeToReducer({
        [GET_SPONSORS]: {
            FULFILLED(state, {payload: {data}}) {
                const storage = LocalStorage.create()
                const date = format(new Date(), 'YYYY-MM-DD')
                const sponsors = {
                    ...data.default,
                    ...(data[date] || {})
                }

                storage.set('sponsors', sponsors)

                return sponsors
            }
        }
    }, LocalStorage.create().get('sponsors', {})),
    active: handleActions({
        [SET_ACTIVE_SPONSOR]: getPayload,
        [RESET_ACTIVE_SPONSOR]: () => null,
    }, null),
})
