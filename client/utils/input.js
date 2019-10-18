export function isTypeSupported(type) {
    if (!SUPORTED.has(type)) {
        try {
            const input = document.createElement('input')

            input.setAttribute('type', type)

            SUPORTED.set(type, input.type === type)
        } catch {
            SUPORTED.set(type, false)
        }
    }

    return SUPORTED.get(type)
}

// Constants
const SUPORTED = new Map()
