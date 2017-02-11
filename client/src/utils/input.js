const suported = new Map()

export function isTypeSupported(type) {
    if (!suported.has(type)) {
        suported.set(
            type,
            Object.assign(document.createElement('input'), {type}).type === type
        )
    }

    return suported.get(type)
}
