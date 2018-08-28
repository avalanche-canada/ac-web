export class Null {
    reset() {}
    has() {
        return false
    }
    get() {}
    set() {}
}

export class Memory {
    constructor() {
        this.store = new Map()
    }
    reset() {
        this.store = new Map()
    }
    has(url) {
        return this.store.has(url)
    }
    get(url) {
        return this.store.get(url)
    }
    set(url, data) {
        return this.state.set(url, data)
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

export class Prismic extends Memory {
    constructor(ref) {
        this.ref = ref
        this.store = new Map()
    }
    setRef(ref) {
        this.ref = ref
        this.reset()
    }
}
