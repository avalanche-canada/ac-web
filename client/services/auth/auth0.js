import { PRIMARY } from 'constants/colors'
import logo from 'styles/AvalancheCanada.svg'
import { clientId, domain } from './config.json'
import Accessor from './accessor'
import { parse } from 'utils/hash'

export default class Auth0Service {
    static create() {
        return new Auth0Service()
    }
    accessor = Accessor.create()
    lock() {
        if (this._lock) {
            return Promise.resolve(this._lock)
        } else {
            return import('auth0-lock').then(({ default: Auth0Lock }) => {
                this._lock = new Auth0Lock(clientId, domain, {
                    closable: true,
                    autoclose: true,
                    avatar: true,
                    auth: {
                        redirect: true,
                        redirectUrl: `${
                            document.location.origin
                        }/login-complete`,
                        responseType: 'id_token token',
                        scope: 'openid email',
                        state: parse(document.location.hash).state,
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
    }
    setAuthResult({ idTokenPayload, accessToken, idToken, ...rest }) {
        const data = {
            accessToken: accessToken,
            idToken: idToken,
            profile: idTokenPayload,
        }

        Object.assign(this.accessor, data)

        return Object.assign(rest, data)
    }
    async resume(hash) {
        const lock = await this.lock()

        return new Promise((fullfil, reject) => {
            lock.resumeAuth(hash, (error, authResult) => {
                if (error) {
                    reject(error)
                } else {
                    fullfil(this.setAuthResult(authResult))
                }
            })
        })
    }
    async login() {
        const lock = await this.lock()

        return new Promise((fullfil, reject) => {
            const { pathname, search, hash } = window.location

            lock.show({
                auth: {
                    params: {
                        state: pathname + search + hash,
                    },
                },
            })

            lock.on('authenticated', authResult => {
                fullfil(this.setAuthResult(authResult))
            })
            lock.on('unrecoverable_error', reject)
            lock.on('authorization_error', reject)
        })
    }
    logout() {
        this.accessor.clear()

        return Promise.resolve()
    }
}