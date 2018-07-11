import decode from 'jwt-decode'
import { LocalStorage } from 'services/storage'

export default class AuthService {
    static create() {
        return new AuthService()
    }
    constructor() {
        this.storage = LocalStorage.create()
    }
    get profile() {
        return this.storage.get('profile', null)
    }
    set profile(profile) {
        this.storage.set('profile', profile)
    }
    get accessToken() {
        return this.storage.get('accessToken', null)
    }
    set accessToken(accessToken) {
        this.storage.set('accessToken', accessToken)
    }
    get idToken() {
        return this.storage.get('idToken', null)
    }
    set idToken(idToken) {
        this.storage.set('idToken', idToken)
    }
    get isAuthenticated() {
        if (!this.idToken) {
            this.clear()

            return false
        }

        const { exp } = decode(this.idToken)
        const expiryDate = new Date(0)

        expiryDate.setUTCSeconds(exp)

        return new Date() < expiryDate
    }
    clear() {
        this.storage.remove('accessToken')
        this.storage.remove('idToken')
        this.storage.remove('profile')
    }
}
