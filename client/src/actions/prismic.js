import {createPrismicAction} from 'middleware/prismic'

export const loadForType = createPrismicAction((type, options) => ({type, options}))
export const loadForUid = createPrismicAction((type, uid) => ({type, uid}))
