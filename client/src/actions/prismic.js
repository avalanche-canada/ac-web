import {createAction} from 'redux-actions'

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
