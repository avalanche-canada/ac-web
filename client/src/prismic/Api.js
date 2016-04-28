import { Api as PrismicApi, Predicates } from 'prismic.io'

const endpoint = 'https://avalancheca.prismic.io/api'
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
