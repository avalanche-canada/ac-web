const {parse, stringify} = JSON
import {NotImplementedError} from 'utils/error'

export default class Storage {
    static create(options) {
        throw new NotImplementedError()
    }
    constructor(storage, options = {}) {
        this.storage = storage
        this.options = options
    }
    generateKey(name) {
        if (this.options.keyPrefix) {
            return `${this.options.keyPrefix}:${name}`
        }

        return name
    }
    get(name, defaultValue) {
        const key = this.generateKey(name)
        const value = this.storage.getItem(key)

        return value ? parse(value) : defaultValue
    }
    set(name, value) {
        const key = this.generateKey(name)
        value = typeof value === 'object' ? stringify(value) : value

        return this.storage.setItem(key, value)
    }
    has(name) {
        const key = this.generateKey(name)

        return this.storage.hasOwnProperty(key)
    }
    remove(name) {
        const key = this.generateKey(name)

        return this.storage.removeItem(key)
    }
}
