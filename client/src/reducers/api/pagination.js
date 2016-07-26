import {combineReducers} from 'redux'
import {List} from 'immutable'
import * as SCHEMAS from 'api/schemas'
import * as ACTIONS from 'actions/entities'
import {getEntitiesForSchemaIds} from 'reducers/api/entities'

const {MountainInformationNetworkObservation} = SCHEMAS
const EMPTY_LIST = new List()

const PAGINATION = {
    isFetching: false,
    ids: [],
}

function paginateFactory(mapActionToKey, request, success, failure) {
    function paginate(state = PAGINATION, {type, payload}) {
        switch (type) {
            case request:
                return {
                    ...state,
                    isFetching: true,
                }
            case success:
                return {
                    ...state,
                    isFetching: false,
                    ids: [...state.ids, ...payload.result],
                }
            case failure:
                return {
                    ...state,
                    isFetching: false,
                }
            default:
                return state
        }

    }

    return function paginateByKey(state = {}, action) {
        switch (action.type) {
            case request:
            case success:
            case failure:
                const key = mapActionToKey(action)

                return {
                    ...state,
                    [key]: paginate(state[key], action)
                }
            default:
                return state
        }
    }
}


export default combineReducers({
    [MountainInformationNetworkObservation.getKey()]: paginateFactory(
        action => action.payload.params.days,
        ACTIONS.MOUNTAIN_INFORMATION_NETWORK_OBSERVATIONS_REQUEST,
        ACTIONS.MOUNTAIN_INFORMATION_NETWORK_OBSERVATIONS_SUCCESS,
        ACTIONS.MOUNTAIN_INFORMATION_NETWORK_OBSERVATIONS_FAILURE,
    )
})

function getPagination(state) {
    return state.api.pagination
}

function getPaginationForSchema(state, schema) {
    const key = schema.getKey()

    return getPagination(state)[key]
}

export function getMountainInformationNetworkObservationsForDays(state, days) {
    const pagination = getPaginationForSchema(MountainInformationNetworkObservation)

    if (!pagination || !pagination[days]) {
        return EMPTY_LIST
    }

    const {ids} = pagination[days]
    const entities = getEntitiesForSchemaIds(state, MountainInformationNetworkObservation, ids)

    return new List(entities)
}
