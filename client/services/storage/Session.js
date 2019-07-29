import Storage from './Storage'

export default class SessionStorage extends Storage {
    static create() {
        return new SessionStorage()
    }
    constructor() {
        let storage

        // Chrome throws when storage are accessed from the global object
        try {
            storage = window.sessionStorage
        } catch {}

        super(storage)
    }
}
