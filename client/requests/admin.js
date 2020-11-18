import { apiBaseURL } from './config'
import fetch from 'utils/fetch'
import { build } from 'utils/url'
import LOCALE from 'constants/locale'

export function users(token, username, page = 1) {
    const url = build('/users', { username, page }, apiBaseURL)

    return fetch(url, {
        headers: createHeaders(token),
    })
}

export function changeUsername(token, userid, username, locale) {
    const url = build('/users/' + encodeURIComponent(userid), undefined, apiBaseURL)

    return fetch(url, {
        method: 'PATCH',
        body: JSON.stringify({ username }),
        headers: createHeaders(token, locale),
    })
}

function createHeaders(token, locale = LOCALE) {
    return new Headers({
        Authorization: 'Bearer ' + token,
        'Accept-Language': locale,
    })
}
