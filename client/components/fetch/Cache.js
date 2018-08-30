export class None {
    reset() {}
    has() {
        return false
    }
    get() {}
    set() {}
}

export class Memory {
    constructor(lifespan = Infinity) {
        this.store = new Map()
        this.lifespan = lifespan
    }
    reset() {
        this.store = new Map()
    }
    has(url) {
        return this.store.has(url) && this.store.get(url).expiry > Date.now()
    }
    get(url) {
        return this.has(url) ? this.store.get(url).data : undefined
    }
    set(url, data) {
        this.store.set(url, {
            expiry: Date.now() + this.lifespan,
            data,
        })
    }
}
