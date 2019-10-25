import memoize from './memoize'

export const isTypeSupported = memoize(type => {
    try {
        const input = document.createElement('input')

        input.setAttribute('type', type)

        return input.type === type
    } catch {
        return false
    }
})
