import { staticBaseURL } from './config'
import fetch from 'utils/fetch'
import * as urls from 'utils/url'

export function sponsors(date) {
    return fetch(urls.path(staticBaseURL, 'sponsors', date))
}
