import { apiBaseURL } from './config.json'
import fetch from 'utils/fetch'
import { build } from 'utils/url'

export function users(token, username, page = 1) {
    const url = build('/users', { username, page }, apiBaseURL)

    return fetch(url, {
        headers: new Headers({
            Authorization: `Bearer ${token}`,
        }),
    })
}
