import {createPrismicAction} from 'middleware/prismic'

export const loadForType = createPrismicAction((type, options) => ({type, options}))
export const loadForBookmark = createPrismicAction(bookmark => ({bookmark}))
export const loadForId = createPrismicAction(id => ({id}))
export const loadForUid = createPrismicAction((type, uid) => ({type, uid}))

export function loadForParams({id, type, uid, bookmark}) {
    return dispatch => {
        let action = null

        if (bookmark) {
            action = loadForBookmark(bookmark)
        } else if (id) {
            action = loadForId(id)
        } else if (type && uid) {
            action = loadForUid(type, uid)
        } else {
            const parameters = JSON.stringify({id, type, uid, bookmark})

            return Promise.reject(`Not enough parameters to load Prismic document ${parameters}.`)
        }

        return dispatch(action)
    }
}
