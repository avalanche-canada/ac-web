export function status(response) {
    const { status, ok } = response

    if (ok && status >= 200 && status < 300) {
        return response.json()
    }
    if (status === 404) {
        return Promise.reject(new NotFound())
    }

    return Promise.reject(new Error(response.statusText))
}

export class NotFound extends Error {
    constructor(...args) {
        super(...args)
        this.name = 'NotFound'
    }
}
