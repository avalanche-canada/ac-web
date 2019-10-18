class Storage {
    constructor(get) {
        try {
            const storage = get()
            const key = '99999'

            storage.setItem(key, key)
            storage.removeItem(key)

            this.storage = storage
        } catch {
            this.storage = new Memory()
        }
    }
    get(key, defaultValue) {
        const value = this.storage.getItem(key)

        try {
            return value ? JSON.parse(value) : defaultValue
        } catch {
            return value || defaultValue
        }
    }
    set(key, value) {
        value = typeof value === 'object' ? JSON.stringify(value) : value

        return this.storage.setItem(key, value)
    }
    has(key) {
        return this.storage.hasOwnProperty(key)
    }
    remove(key) {
        return this.storage.removeItem(key)
    }
}

class LocalStorage extends Storage {
    constructor() {
        super(() => window.localStorage)
    }
}

class SessionStorage extends Storage {
    constructor() {
        super(() => window.sessionStorage)
    }
}

export const Session = new SessionStorage()
export const Local = new LocalStorage()

// Fallback Storage
class Memory {
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
    hasOwnProperty(key) {
        return this.content.has(key)
    }
}
