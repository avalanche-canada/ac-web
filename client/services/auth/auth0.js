import { PRIMARY } from 'constants/colors'
import logo from 'styles/AvalancheCanada.svg'
import { clientId, domain } from './config.json'
import Accessor from './accessor'
import Auth0Lock from 'auth0-lock'
import { parse } from 'utils/hash'
export default class Auth0Service {
    static create() {
        return new Auth0Service()
    }
    accessor = Accessor.create()
    lock = new Auth0Lock(clientId, domain, {
        closable: true,
        autoclose: true,
        avatar: true,
        auth: {
            redirect: true,
            redirectUrl: `${document.location.origin}/login-complete`,
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
    setAuthResult({ idTokenPayload, accessToken, idToken, ...rest }) {
        const data = {
            accessToken: accessToken,
            idToken: idToken,
            profile: idTokenPayload,
        }

        Object.assign(this.accessor, data)

        return Object.assign(rest, data)
    }
    resume(hash) {
        return new Promise((fullfil, reject) => {
            this.lock.resumeAuth(hash, (error, authResult) => {
                if (error) {
                    reject(error)
                } else {
                    fullfil(this.setAuthResult(authResult))
                }
            })
        })
    }
    login() {
        return new Promise((fullfil, reject) => {
            const { pathname, search, hash } = window.location

            this.lock.show({
                auth: {
                    params: {
                        state: pathname + search + hash,
                    },
                },
            })

            this.lock.on('authenticated', authResult => {
                fullfil(this.setAuthResult(authResult))
            })
            this.lock.on('unrecoverable_error', reject)
            this.lock.on('authorization_error', reject)
        })
    }
    logout() {
        this.accessor.clear()

        return Promise.resolve()
    }
}
