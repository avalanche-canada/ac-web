import Prismic from 'prismic.io'
import {endpoint} from './config.json'

const {Predicates} = Prismic
let API = null
let API_PROMISE = null

function getApi() {
    if (API) {
        return Promise.resolve(API)
    }

    if (API_PROMISE) {
        return API_PROMISE
    }

    API_PROMISE = Prismic.Api(endpoint)

    return API_PROMISE.then(api => {
        API = api

        return api
    })
}

export function Query(predicates, options) {
    return getApi().then(api => query(api, options, predicates))
}

// TODO: To be removed once tutorial page are ported to store
export function QueryDocumentByBookmark(name) {
    return getApi().then(api => {
        const id = api.bookmarks[name]

        return query(api, undefined, Predicates.at('document.id', id))
    }).then(response => response.results[0])
}

function query(api, options = {}, ...predicates) {
    const keys = Object.keys(options)
    const form = api.form('everything').ref(api.master()).query(...predicates)

    keys.reduce((form, key) => form[key](options[key]), form)

    return form.submit()
}
