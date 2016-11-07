import Storage from './Storage'

export default class SessionStorage extends Storage {
    static create(options) {
        return new SessionStorage(options)
    }
    constructor(options = {}) {
        super(window.sessionStorage, options)
    }
}
