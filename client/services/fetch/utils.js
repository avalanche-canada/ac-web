export function status(response) {
    if (response.ok) {
        return response.json()
    }

    return response.status === 404
        ? Promise.reject(new NotFound())
        : Promise.reject(new Error(response.statusText))
}

export class NotFound extends Error {
    constructor(...args) {
        super(...args)
        this.name = 'NotFound'
    }
}
