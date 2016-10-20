NotImplementedError.prototype = new Error

export default function NotImplementedError(message) {
    this.name = 'NotImplementedError'
    this.message = message
    this.stack = (new Error()).stack
}
