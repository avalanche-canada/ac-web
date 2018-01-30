const suported = new Map()

export function isTypeSupported(type) {
    if (!suported.has(type)) {
        try {
            const input = document.createElement('input')

            input.setAttribute('type', type)

            suported.set(type, input.type === type)
        } catch (e) {
            suported.set(type, false)
        }
    }

    return suported.get(type)
}
