import * as Predicates from 'prismic/predicates'

export function uid({ type, uid }) {
    return {
        predicates: [Predicates.uid(type, uid)],
    }
}

export function ids(ids) {
    return {
        predicates: [Predicates.in('document.id', ids)],
        pageSize: ids.length,
    }
}
