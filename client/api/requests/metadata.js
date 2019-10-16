import * as urls from '../urls/metadata'
import fetch from 'utils/fetch'

export function metadata() {
    return fetch(urls.metadata())
}
