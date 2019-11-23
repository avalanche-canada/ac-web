class Storage {
    constructor(access) {
        try {
            // Use a function to access the storage.
            // Some browsers (i.e. Google) throw when trying to access the storage
            // if full or for security restrictions
            const storage = access()
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

// Fallback Storage
// This needs to be above we create "Local" and "Session" instances
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

export const Local = new Storage(() => window.localStorage)
export const Session = new Storage(() => window.sessionStorage)
