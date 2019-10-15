// TODO Move these outside of the "components" folder

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
        this.timestamps = new Map()
        this.lifespan = lifespan
    }
    reset() {
        this.store = new Map()
        this.timestamps = new Map()
    }
    has(url) {
        const timestamp = this.timestamps.get(url)

        return (
            typeof timestamp === 'number' &&
            timestamp + this.lifespan > Date.now()
        )
    }
    get(url) {
        return this.has(url) ? this.store.get(url) : undefined
    }
    set(url, data) {
        this.store.set(url, data)
        this.timestamps.set(url, Date.now())
    }
}
