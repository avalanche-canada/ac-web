import { VANCOUVER_ISLAND, CHIC_CHOCS } from 'constants/forecast/owners'

const externals = new Map([
    ['little-yoho', createParkURL(5)],
    ['banff-yoho-kootenay', createParkURL(1)],
    [VANCOUVER_ISLAND, '//www.islandavalanchebulletin.com/'],
    ['jasper', createParkURL(2)],
    ['waterton', createParkURL(4)],
    [
        CHIC_CHOCS,
        '//avalanchequebec.ca/conditions-chic-chocs/#bulletins-avalanche',
    ],
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
    } catch (error) {
        return
    }
}

// Utils
function createParkURL(region) {
    return `//avalanche.pc.gc.ca/bulletin-eng.aspx?r=${region}&d=TODAY`
}
