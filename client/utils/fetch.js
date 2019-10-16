export default function request(...args) {
    return fetch(...args).then(status)
}

export function status(response) {
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
