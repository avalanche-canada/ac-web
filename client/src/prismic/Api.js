import { Api as PrismicApi, Predicates } from 'prismic.io'
import {endpoint} from './config.json'

const form = 'everything'

function setter(api) {
    return Promise.resolve(api.form(form).ref(api.master()))
}

export function Api() {
    return PrismicApi(endpoint).then(setter)
}

export function Query(...predicates) {
    return Api().then(api => api.query(...predicates).submit())
}

export function QueryDocument(id) {
    return Query(Predicates.at('document.id', id)).then(res => res.results[0])
}

export function QueryDocumentByUid(uid) {
    return Query(Predicates.at('my.page.uid', uid)).then(res => res.results[0])
}
