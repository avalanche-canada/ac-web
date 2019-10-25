import { PRIMARY } from 'constants/colors'
import logo from 'styles/AvalancheCanada.svg'
import { clientId, domain } from './config.json'
import Accessor from './accessor'

export async function resume(hash) {
    const l = await lock()

    return new Promise((fullfil, reject) => {
        l.resumeAuth(hash, (error, authResult) => {
            if (error) {
                reject(error)
            } else {
                fullfil(setAuthResult(authResult))
            }
        })
    })
}

export async function login(events = new Map()) {
    const l = await lock()

    return new Promise((fullfil, reject) => {
        const { pathname, search, hash } = window.location

        l.show({
            auth: {
                params: {
                    state: pathname + search + hash,
                },
            },
        })

        l.on('authenticated', authResult => {
            fullfil(setAuthResult(authResult))
        })
        l.on('unrecoverable_error', reject)

        for (const [event, callback] of events) {
            l.on(event, callback)
        }
    })
}

export function logout() {
    Accessor.clear()
}

// Utils
let LOCK = null
async function lock() {
    if (LOCK) {
        return Promise.resolve(LOCK)
    } else {
        return import('auth0-lock').then(({ default: Auth0Lock }) => {
            const { hash, origin } = document.location
            const params = new URLSearchParams(hash.replace(/^\#/, ''))

            LOCK = new Auth0Lock(clientId, domain, {
                closable: true,
                autoclose: false,
                avatar: true,
                auth: {
                    redirect: true,
                    redirectUrl: `${origin}/login-complete`,
                    responseType: 'id_token token',
                    scope: 'openid email',
                    state: params.get('state'),
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

            return LOCK
        })
    }
}
function setAuthResult({ idTokenPayload, accessToken, idToken, ...rest }) {
    const data = {
        accessToken: accessToken,
        idToken: idToken,
        profile: idTokenPayload,
    }

    Object.assign(Accessor, data)

    return Object.assign(rest, data)
}
