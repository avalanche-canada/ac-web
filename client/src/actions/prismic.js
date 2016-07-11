import {createAction} from 'redux-actions'
import {PRISMIC} from 'middleware/prismic'

export const loadForType = createAction(PRISMIC, (type, options) => ({type, options}))
export const loadForBookmark = createAction(PRISMIC, (bookmark) => ({bookmark}))
export const loadForUid = createAction(PRISMIC, (type, uid) => ({type, uid}))
