export function trulyKeys(object = {}) {
    return Object.keys(object).filter(key => object[key])
}

export function projectKeys(object = {}, truly = {}) {
    return trulyKeys(truly).map(key => object[key])
}

export function clean(object = {}) {
    return Object.keys(object).reduce((previous, key) => {
        if (object[key]) {
            previous[key] = object[key]
        }

        return previous
    }, {})
}
