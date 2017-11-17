import { PRIMARY } from 'constants/colors'
import logo from 'styles/AvalancheCanada.svg'
import { clientId, domain } from './config.json'
import decode from 'jwt-decode'
import { LocalStorage } from 'services/storage'

export default class AuthService {
    static create(options) {
        return new AuthService(options)
    }
    constructor() {
        this.storage = LocalStorage.create()
    }
    get lock() {
        if (this._lock) {
            return Promise.resolve(this._lock)
        }

        return import('auth0-lock').then(mod => {
            const { origin, pathname, search, hash } = document.location

            this._lock = new mod.default(clientId, domain, {
                closable: true,
                avatar: true,
                auth: {
                    redirectUrl: `${origin}/login-complete`,
                    responseType: 'token',
                    params: {
                        state: pathname + search + hash,
                    },
                },
                theme: {
                    primaryColor: PRIMARY,
                    logo,
                },
                socialButtonStyle: 'small',
                languageDictionary: {
                    title: '',
                },
            })

            return this._lock
        })
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
    login() {
        return new Promise((resolve, reject) => {
            this.lock.then(lock => {
                lock.on('authorization_error', error => {
                    reject(error)
                })
                lock.on('hide', () => {
                    reject(new Error('User hides Auth0 Lock login modal.'))
                })

                lock.show()

                resolve(lock)
            })
        })
    }
    logout() {
        this.clear()
    }
    clear() {
        this.storage.remove('accessToken')
        this.storage.remove('idToken')
        this.storage.remove('profile')
    }
    fetchProfile() {
        if (!this.accessToken) {
            return Promise.reject('No accessToken provided yet.')
        }

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.lock.then(lock => {
                    lock.getUserInfo(this.accessToken, (error, profile) => {
                        if (error) {
                            reject(error)
                        }

                        this.profile = profile

                        resolve(profile)
                    })
                })
            }, 500)
        })
    }
    checkTokenExpiry() {
        if (!this.idToken) {
            this.clear()

            return false
        }

        const { exp } = decode(this.idToken)
        const expiryDate = new Date(0)

        expiryDate.setUTCSeconds(exp)

        return new Date() < expiryDate
    }
    isAuthenticated() {
        return this.checkTokenExpiry()
    }
}
