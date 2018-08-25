import 'whatwg-fetch'
import { clean } from './utils'

export function get(input, { params, ...init } = {}) {
    params = clean(params)

    const search = params ? new URLSearchParams(params) : null
    const url = search ? `${input}?${search.toString()}` : input

    return new Request(url, { headers, ...init })
}

export function post(input, init = {}) {
    const { body, ...rest } = init

    return new Request(input, {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        body: body instanceof FormData ? body : JSON.stringify(body),
        ...rest,
    })
}

// Constants
const headers = new Headers({
    Accept: 'application/json',
})
