import { Api as PrismicApi, Predicates } from 'prismic.io'
import {endpoint} from './config.json'

const form = 'everything'

function defaultSetter(api) {
    return Promise.resolve(api.form(form).ref(api.master()))
}

export function Api(setter = defaultSetter) {
    return PrismicApi(endpoint).then(setter)
}

export function Query({predicates, ...options}) {
    return Api().then(
        api => {
            const keys = Object.keys(options)

            api = api.query(...predicates)

            keys.reduce((api, key) => api[key](options[key]), api)

            return api.submit()
        }
    )
}

function queryOne(predicate) {
    return Query({
        predicates: [predicate]
    }).then(res => res.results[0])
}

export function QueryDocument(id) {
    return queryOne(Predicates.at('document.id', id))
}

export function QueryDocumentByUid(uid) {
    return queryOne(Predicates.at('my.page.uid', uid))
}
