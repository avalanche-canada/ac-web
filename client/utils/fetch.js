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

function status(response) {
    if (response.ok) {
        return response.json()
    }

    const HTTPError = response.status === 404 ? NotFound : Error
    const error = new HTTPError(response.statusText)

    return Promise.reject(error)
}

// TODO We could create an HTTPError instead

export class NotFound extends Error {
    constructor(...args) {
        super(...args)
        this.name = 'NotFound'
    }
}

// Constants
const REQUESTS = new Map()
