import {createAction} from 'redux-actions'
import {MountainInformationNetworkObservation, Forecast} from 'api/schemas'

const API = Symbol('AvCan Api Request')

export function createApiAction(schema, ...types) {
    return createAction(API, params => ({
        schema,
        params,
        types,
    }))
}

export function isApiAction({type}) {
    return type === API
}

const ActionsToKey = new Map([
    [MountainInformationNetworkObservation, action => action.payload.params.days],
    [Forecast, action => action.payload.params.name],
])

export function actionToKey(schema, action) {
    if (ActionsToKey.has(schema)) {
        return ActionsToKey.get(schema).call(null, action)
    }

    return String(null)
}
