export function trulyKeys(object = {}) {
    return Object.keys(object).filter(key => object[key])
}

export function projectKeys(object = {}, truly = {}) {
    return trulyKeys(truly).map(key => object[key])
}

export function clean(object = {}) {
    Object.keys(object).forEach(key => {
        if (!object[key]) {
            delete object[key]
        }
    })

    return object
}
