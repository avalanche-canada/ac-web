import Storage from './Storage'

export default class SessionStorage extends Storage {
    static create() {
        return new SessionStorage()
    }
    constructor() {
        super(window.sessionStorage)
    }
}
