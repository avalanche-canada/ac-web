import {createAction} from 'redux-actions'
import {getDocumentsOfType, getDocumentForUid, hasDocumentForUid} from 'getters/prismic'
import {Predicates} from 'prismic'
import {yesterday, tomorrow, formatAsDay} from 'utils/date'

const PRISMIC = Symbol('prismic-query')
const HZR = 'hotzone-report'

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
export function loadHotZoneReport({name, uid}) {
    return (dispatch, getState) => {
        const state = getState()

        if (typeof uid === 'string' && !hasDocumentForUid(state, HZR, uid)) {
            return dispatch(loadForUid(HZR, uid))
        } else {
            const documents = getDocumentsOfType(state, HZR)
            function finder(document) {
                return document.data[`${HZR}.region`].value === name
            }

            if (!documents.find(finder)) {
                return dispatch(loadForType(HZR, {
                    predicates: [
                        Predicates.at(`my.${HZR}.region`, name)
                    ]
                }))
            }
        }
    }
}
export const loadToyotaTruckReports = lazyLoadForTypeFactory('toyota-truck-report')
export function loadHotZoneReports() {
    // TODO: Implement a better way to reduce action dispatching for Prismic!
    function noop() {}
    const action = loadForType(HZR, {
        predicates: [
            Predicates.dateBefore(`my.${HZR}.dateOfIssue`, formatAsDay(tomorrow())),
            Predicates.dateAfter(`my.${HZR}.validUntil`, formatAsDay(yesterday())),
        ]
    })

    return dispatch => dispatch(action).then(resp => {
        loadHotZoneReports = noop
        
        return resp
    })
}

function lazyLoadForTypeFactory(type, options) {
    return () => (dispatch, getState) => {
        const state = getState()

        if (getDocumentsOfType(state, type).isEmpty()) {
            return dispatch(loadForType(type, options))
        }
    }
}
