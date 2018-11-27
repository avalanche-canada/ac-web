import { clean } from './utils'

export function get(input, params, init) {
    return new Request(
        buildURL(input, params),
        Object.assign({ headers, credentials }, init)
    )
}

export function post(input, params, init = {}) {
    const { body, ...rest } = init

    return new Request(buildURL(input, params), {
        headers,
        method: 'POST',
        mode: 'cors',
        credentials,
        body: body instanceof FormData ? body : JSON.stringify(body),
        ...rest,
    })
}

// Constants and utils
const credentials = 'same-origin'
const headers = new Headers({
    Accept: 'application/json',
})
function buildURL(input, params) {
    params = clean(params)

    const search = params ? new URLSearchParams(params) : null

    return search ? `${input}?${search.toString()}` : input
}
