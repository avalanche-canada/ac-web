export default function request(url, init) {
    if (!REQUESTS.has(url)) {
        const request = fetch(url, init)
            .then(status)
            .finally(() => {
                REQUESTS.delete(url)
            })

        REQUESTS.set(url, request)
    }

    return REQUESTS.get(url)
}

export class HTTPError extends Error {
    constructor(response, payload) {
        super(response.statusText)
        this.name = 'HTTPError'
        this.status = response.status
        this.payload = payload
    }
}

export function empty() {
    return Promise.resolve()
}

// Constants & utils
const REQUESTS = new Map()
async function status(response) {
    const payload = await response.json()

    if (response.ok) {
        return payload
    }

    const error = new HTTPError(response, payload)

    return Promise.reject(error)
}
