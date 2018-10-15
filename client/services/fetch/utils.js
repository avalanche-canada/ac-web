export function status(response) {
    const { status, ok } = response

    if (ok && status >= 200 && status < 300) {
        return response.json()
    }

    return Promise.reject(new Error(response.statusText))
}

export function clean(params) {
    return params
        ? Object.entries(params).reduce((params, [key, value]) => {
              if (value !== undefined && value !== null) {
                  params[key] = value
              }

              return params
          }, {})
        : undefined
}
