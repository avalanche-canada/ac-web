export function trulyKeys(object = {}) {
    return Object.keys(object).filter(key => object[key])
}

export function clean(object = {}) {
    return Object.fromEntries(
        Object.entries(object).filter(([_key, value]) => value != null)
    )
}
