// FIXME It is useful module, however we should rely on the settings coming from the server.

const externals = new Map([
    ['little-yoho', createParkURL(5)],
    ['banff-yoho-kootenay', createParkURL(1)],
    ['jasper', createParkURL(2)],
    ['waterton', createParkURL(4)],
    ['glacier', createParkURL(3)],
])

export default externals

export function open(name, date) {
    if (!externals.has(name)) {
        return
    }

    let url = externals.get(name)

    if (date) {
        const [path, search] = url.split('?')
        const params = new URLSearchParams(search)

        params.set('d', date)

        url = [path, params.toString()].filter(Boolean).join('?')
    }

    try {
        window.open(url, name)
    } catch {
        return
    }
}

// Utils
function createParkURL(region) {
    return `//avalanche.pc.gc.ca/bulletin-eng.aspx?r=${region}&d=TODAY`
}
