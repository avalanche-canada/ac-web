import Auth0Lock from 'auth0-lock'
import {PRIMARY, SECONDARY} from 'constants/colors'
import logo from 'styles/AvalancheCanada.svg'
import {clientId, domain} from './config.json'
import decode from 'jwt-decode'
import CancelError from 'utils/promise/CancelError'
import {LocalStorage} from 'services/storage'

export default class AuthService {
    static create(options) {
        return new AuthService(options)
    }
    constructor(options) {
        const {origin, pathname} = document.location

        this.storage = LocalStorage.create()
        this.lock = new Auth0Lock(clientId, domain, {
            closable: true,
            avatar: true,
            auth: {
                redirectUrl: `${origin}/login-complete`,
                responseType: 'token',
                params: {
                    state: pathname
                }
            },
            theme: {
                primaryColor: PRIMARY,
                logo,
            },
            socialButtonStyle: 'small',
            languageDictionary: {
                title: ''
            }
        })
    }
    get profile() {
        return this.storage.get('profile', null)
    }
    set profile(profile) {
        this.storage.set('profile', profile)
    }
    get token() {
        return this.storage.get('token', null)
    }
    set token(token) {
        this.storage.set('token', token)
    }
    login() {
        return new Promise((resolve, reject) => {
            this.lock.on('authorization_error', error => reject(error))
            this.lock.on('hide', () => reject(new CancelError()))

            this.lock.show()
        })
    }
    logout() {
        this.storage.remove('token')
        this.storage.remove('profile')
    }
    fetchProfile() {
        if (!this.token) {
            return Promise.reject('No token provided yet.')
        }

        return new Promise((resolve, reject) => {
            this.lock.getProfile(this.token, (error, profile) => {
                if (error) {
                    reject(error)
                }

                this.profile = profile

                resolve(profile)
            })
        })
    }
    checkTokenExpiry() {
        const {token} = this

        if (!token) {
            return false
        }

        const {exp} = decode(token)
        const expiryDate = new Date(0)

        expiryDate.setUTCSeconds(exp)

        return new Date() < expiryDate
    }
}
