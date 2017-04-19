export default class Memory {
    constructor() {
        this.content = {}
    }
    getItem(key, defaultValue) {
        if (this.content.hasOwnProperty(key)) {
            return this.content[key]
        }

        return defaultValue
    }
    setItem(key, value) {
        this.content[key] = value
    }
    removeItem(key) {
        delete this.content[key]
    }
    clear() {
        this.content = {}
    }
}
