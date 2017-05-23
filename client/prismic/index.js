import parse from './parsers'

export * as Api from './Api'
export { Predicates } from 'prismic.io'
export parse from './parsers'
export function parseForMap(document) {
    return parse(document)
}
