export function keys(values) {
    return Object.keys(values).filter(key => key !== 'default')
}

export function asMap(constants, values) {
    return new Map(keys(constants).map(key => [constants[key], values[key]]))
}

export function asValues(constants) {
    return keys(constants).map(key => constants[key])
}

export function heading(level = 1) {
    return Array(level + 1).join('#')
}
