import {createAction} from 'redux-actions'
import {getDocumentsOfType} from 'getters/prismic'

const PRISMIC = Symbol('prismic-query')

export const PRISMIC_REQUEST = 'PRISMIC_REQUEST'
export const PRISMIC_SUCCESS = 'PRISMIC_SUCCESS'
export const PRISMIC_FAILURE = 'PRISMIC_FAILURE'

export function isPrismicAction({type}) {
    return type === PRISMIC
}

export const loadForType = createAction(
    PRISMIC,
    (type, options) => ({type, options})
)
export const loadForUid = createAction(
    PRISMIC,
    (type, uid) => ({type, uid})
)
export const loadToyotaTruckReports = lazyLoadForTypeFactory('toyota-truck-report')
export const loadHotZoneReports = lazyLoadForTypeFactory('hot-zone-report')

function lazyLoadForTypeFactory(type) {
    return () => (dispatch, getState) => {
        const state = getState()

        if (getDocumentsOfType(state, type).isEmpty()) {
            return dispatch(loadForType(type))
        }
    }
}
