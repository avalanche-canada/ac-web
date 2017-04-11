import {NotImplementedError} from '/utils/error'
import Memory from './Memory'

const {parse, stringify} = JSON

export default class Storage {
    static create(options) {
        throw new NotImplementedError()
    }
    constructor(storage = new Memory(), options = {}) {
        this.options = options

        try {
            storage.setItem('local-storage-test', 1)
            storage.removeItem('local-storage-test')

            this.storage = storage
        } catch (error) {
            this.storage = new Memory()
        }
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

        try {
            return value ? parse(value) : defaultValue
        } catch (e) {
            return value || defaultValue
        }
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
