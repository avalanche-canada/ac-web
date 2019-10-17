export default function request(url, init) {
    if (REQUESTS.has(url)) {
        return REQUESTS.get(url)
    }

    const request = fetch(url, init)
        .then(status)
        .finally(() => {
            REQUESTS.delete(url)
        })

    REQUESTS.set(url, request)

    return request
}

export class HTTPError extends Error {
    constructor(response) {
        super(response.statusText)
        this.name = 'HTTPError'
        this.response = response
    }
    get status() {
        return this.response.status
    }
}

// Constants & utils
const REQUESTS = new Map()
function status(response) {
    if (response.ok) {
        return response.json()
    }

    const error = new HTTPError(response)

    return Promise.reject(error)
}
