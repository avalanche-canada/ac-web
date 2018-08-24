export function status(response) {
    const { status, ok } = response

    if (ok && status >= 200 && status < 300) {
        return response.json()
    }

    return Promise.reject(throw new Error(response.statusText))
}
