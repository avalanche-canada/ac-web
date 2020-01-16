import decode from 'jwt-decode'
import { Local as Storage } from 'services/storage'

class AuthAccessor {
    get profile() {
        return Storage.get('profile', null)
    }
    set profile(profile) {
        Storage.set('profile', profile)
    }
    get accessToken() {
        return Storage.get('accessToken', null)
    }
    set accessToken(accessToken) {
        Storage.set('accessToken', accessToken)
    }
    get idToken() {
        return Storage.get('idToken', null)
    }
    set idToken(idToken) {
        Storage.set('idToken', idToken)
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
        Storage.remove('accessToken')
        Storage.remove('idToken')
        Storage.remove('profile')
    }
}

export default new AuthAccessor()
