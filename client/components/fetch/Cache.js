export class Null {
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
        return this.store.set(url, {
            expiry: Date.now() + this.lifespan,
            data,
        })
    }
}

class StorageProxy {
    constructor(storage) {
        this.storage = storage
    }
    reset() {}
    has() {
        return false
    }
    get() {}
    set() {}
}

export class Session extends StorageProxy {
    constructor() {}
}

export class Local {
    constructor() {}
    reset() {}
    has() {
        return false
    }
    get() {}
    set() {}
}
