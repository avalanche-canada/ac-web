const {keys} = Object

export function trulyKeys(object) {
    return keys(object).filter(key => object[key])
}

export function projectKeys(object, truly) {
    return trulyKeys(truly).map(key => object[key])
}
