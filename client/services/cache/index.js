export class None {
    reset() {}
    has() {
        return false
    }
    get() {}
    set() {}
    remove() {}
}

export class Memory {
    constructor() {
        this.store = new Map()
        this.expiries = new Map()
    }
    reset() {
        this.store.clear()
        this.expiries.clear()
    }
    has(key) {
        const expiry = this.expiries.get(key)

        return typeof expiry === 'number' && Date.now() < expiry
    }
    get(key, defaultValue) {
        return this.has(key) ? this.store.get(key) : defaultValue
    }
    set(key, data, lifespan = Infinity) {
        this.store.set(key, data)
        this.expiries.set(key, Date.now() + lifespan)
    }
    remove(key) {
        this.store.delete(key)
        this.expiries.delete(key)
    }
}
