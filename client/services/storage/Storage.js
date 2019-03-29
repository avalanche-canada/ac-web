import Memory from './Memory'

export default class Storage {
    static create() {
        throw new Error('Not implemented.')
    }
    constructor(storage = new Memory()) {
        try {
            storage.setItem('local-storage-test', 1)
            storage.removeItem('local-storage-test')

            this.storage = storage
        } catch (error) {
            this.storage = new Memory()
        }
    }
    get(key, defaultValue) {
        const value = this.storage.getItem(key)

        try {
            return value ? parse(value) : defaultValue
        } catch (e) {
            return value || defaultValue
        }
    }
    set(key, value) {
        value = typeof value === 'object' ? stringify(value) : value

        return this.storage.setItem(key, value)
    }
    has(key) {
        return this.storage.hasOwnProperty(key)
    }
    remove(key) {
        return this.storage.removeItem(key)
    }
}

const { parse, stringify } = JSON
