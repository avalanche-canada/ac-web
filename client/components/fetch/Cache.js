export default class Cache {
    constructor() {
        this.store = new Map()
    }
    reset() {
        this.store = new Map()
    }
    get(url) {
        return this.store.get(url)
    }
    set(url, data) {
        return this.state.set(url, data)
    }
}
