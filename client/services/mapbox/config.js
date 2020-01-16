export const USENAME = 'avalanchecanada'
export const ACCESS_TOKEN =
    'pk.eyJ1IjoiYXZhbGFuY2hlY2FuYWRhIiwiYSI6ImNqd2dvZmUxdzE4ZWg0M2tkaXpuNG95aTQifQ.pBLM87fE3sIxRJqJT7Bf7g'

export const API = 'https://api.mapbox.com'

export const STYLE_IDS = {
    default: 'cjlpguf2l1g0x2rria6jlajrc',
    ates: 'cjbgz98hyb8l52smx72wh1yzr',
}

const STYLE_ROOT = 'mapbox://styles/' + USENAME + '/'

export const STYLES = {
    default: STYLE_ROOT + STYLE_IDS.default,
    ates: STYLE_ROOT + STYLE_IDS.ates,
}
