import Storage from './Storage'

export default class LocalStorage extends Storage {
    static create(options) {
        return new LocalStorage(options)
    }
    constructor(options = {}) {
        super(localStorage)
    }
}
