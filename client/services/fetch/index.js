import { status } from './utils'

export function fetch(input, init) {
    return window.fetch(input, init).then(status)
}
