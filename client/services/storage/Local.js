import Storage from './Storage'

export default class LocalStorage extends Storage {
    static create() {
        return new LocalStorage()
    }
    constructor() {
        super(window.localStorage)
    }
}
