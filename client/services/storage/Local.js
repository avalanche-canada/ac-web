import Storage from './Storage'

export default class LocalStorage extends Storage {
    static create() {
        return new LocalStorage()
    }
    constructor() {
        let storage

        // Chrome throws when storage are accessed from the global object
        try {
            storage = window.localStorage
        } catch {}

        super(storage)
    }
}
