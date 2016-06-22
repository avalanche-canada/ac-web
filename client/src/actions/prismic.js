import {Api as Prismic, Predicates} from 'prismic'
import {getNewsDocuments} from 'reducers/prismic'

export const PRISMIC_REQUEST = 'PRISMIC_REQUEST'
export const PRISMIC_SUCCESS = 'PRISMIC_SUCCESS'
export const PRISMIC_FAILURE = 'PRISMIC_FAILURE'

export function loadNews() {
    return (dispatch, getState) => {
        const news = getNewsDocuments(getState())

        if (news && news.length) {
            return null
        }

        return dispatch(fetchNews())
    }
}

function fetchNews() {
    const type = 'news'
    const meta = {type}
    const predicates = [Predicates.at('document.type', type)]

    return dispatch => {
        dispatch({
            type: PRISMIC_REQUEST,
            meta,
        })

        return Prismic.Query({
            predicates,
            pageSize: 100,
        }).then(
            response => {
                dispatch({
                    type: PRISMIC_SUCCESS,
                    payload: response.results,
                    meta,
                })
            },
            () => {
                dispatch({
                    type: PRISMIC_FAILURE,
                    payload: new Error('Can not fetch news from prismic.'),
                    error: true,
                    meta,
                })
            },
        )
    }
}
