export default class Memory {
    constructor() {
        this.content = new Map()
    }
    getItem(key, defaultValue) {
        return this.content.has(key) ? this.content.get(key) : defaultValue
    }
    setItem(key, value) {
        this.content.set(key, value)
    }
    removeItem(key) {
        this.content.delete(key)
    }
    clear() {
        this.content.clear()
    }
}
