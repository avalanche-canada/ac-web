import Auth0Lock from 'auth0-lock'
import { PRIMARY } from '~/constants/colors'
import logo from '~/styles/AvalancheCanada.svg'
import { clientId, domain } from './config.json'
import decode from 'jwt-decode'
import CancelError from '~/utils/promise/CancelError'
import { LocalStorage } from '~/services/storage'

export default class AuthService {
    static create(options) {
        return new AuthService(options)
    }
    constructor() {
        const { origin, pathname } = document.location

        this.storage = LocalStorage.create()
        this.lock = new Auth0Lock(clientId, domain, {
            closable: true,
            avatar: true,
            auth: {
                redirectUrl: `${origin}/login-complete`,
                responseType: 'token',
                params: {
                    state: pathname,
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
            this.lock.on('authorization_error', error => reject(error))
            this.lock.on('hide', () =>
                reject(new CancelError('User hides lock login modal.'))
            )

            this.lock.show()
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
            this.lock.getUserInfo(this.accessToken, (error, profile) => {
                if (error) {
                    reject(error)
                }

                this.profile = profile

                resolve(profile)
            })
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
