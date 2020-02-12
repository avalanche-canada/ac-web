import { PRIMARY } from 'constants/colors'
import logo from 'styles/AvalancheCanada.svg'
import config from './config.json'
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

export async function login() {
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
            l.hide()
        })
        l.on('unrecoverable_error', reject)
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
        return import('auth0-lock').then(
            ({ default: Auth0Lock }) => {
                const { hash, origin } = document.location
                const params = new URLSearchParams(hash.replace(/^\#/, ''))
                const { clientId, domain, configurationBaseUrl } = config

                LOCK = new Auth0Lock(clientId, domain, {
                    configurationBaseUrl,
                    closable: true,
                    autoclose: true,
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
            },
            error => {
                if (error.name === 'ChunkLoadError') {
                    window.location.reload(true)

                    // TODO That is not enough, need to reload and open the login screen as well,
                    // so user will not get too confused. Need to create a "/login" route and then pass the
                    // current location as parameter.

                    return
                }

                throw error
            }
        )
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
