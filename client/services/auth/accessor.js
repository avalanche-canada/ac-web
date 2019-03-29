import decode from 'jwt-decode'
import { LocalStorage } from 'services/storage'

export default class AuthService {
    static create() {
        return new AuthService()
    }
    get profile() {
        return STORAGE.get('profile', null)
    }
    set profile(profile) {
        STORAGE.set('profile', profile)
    }
    get accessToken() {
        return STORAGE.get('accessToken', null)
    }
    set accessToken(accessToken) {
        STORAGE.set('accessToken', accessToken)
    }
    get idToken() {
        return STORAGE.get('idToken', null)
    }
    set idToken(idToken) {
        STORAGE.set('idToken', idToken)
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
        STORAGE.remove('accessToken')
        STORAGE.remove('idToken')
        STORAGE.remove('profile')
    }
}

const STORAGE = LocalStorage.create()
