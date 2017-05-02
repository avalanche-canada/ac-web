CancelError.prototype = new Error()

export default function CancelError(message) {
    this.name = 'CancelError'
    this.message = message
    this.stack = new Error().stack
}
