import Prismic from 'prismic.io'
import {endpoint} from './config.json'

const {Predicates} = Prismic

export function Api() {
    return Prismic.Api(endpoint).then(api => api.form('everything').ref(api.master()))
}

export function Query(predicates, options) {
    return Api().then(api => query(api, options, predicates))
}

export function QueryDocumentsOfType(type) {
    return Query(Predicates.at('document.type', type))
}

export function QueryDocumentByUid(type, uid) {
    return Query(Predicates.at(`my.${type}.uid`, uid)).then(first)
}

export function QueryDocumentByBookmark(name) {
    return Api().then(api => {
        const id = api.bookmarks[name]

        return query(api, undefined, Predicates.at('document.id', id))
    }).then(first)
}

function query(api, options = {}, ...predicates) {
    api = api.query(...predicates)

    api = setOptions(api, options)

    return api.submit()
}

export function setOptions(api, options = {}) {
    const keys = Object.keys(options)

    return keys.reduce((api, key) => api[key](options[key]), api)
}

function first(response) {
    return response.results[0]
}
