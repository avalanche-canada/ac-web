export function trulyKeys(object = {}) {
    return Object.keys(object).filter(key => object[key])
}

export function projectKeys(object = {}, truly = {}) {
    return trulyKeys(truly).map(key => object[key])
}

export function clean(object = {}) {
    return Object.entries(object).reduce((object, [key, value]) => {
        if (value != null) {
            object[key] = value
        }

        return object
    }, {})
}
