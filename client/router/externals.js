import URL from 'url'
import { VANCOUVER_ISLAND, CHIC_CHOCS } from 'constants/forecast/owners'

const externals = new Map([
    ['little-yoho', '//avalanche.pc.gc.ca/bulletin-eng.aspx?r=5&d=TODAY'],
    [
        'banff-yoho-kootenay',
        '//avalanche.pc.gc.ca/bulletin-eng.aspx?r=1&d=TODAY',
    ],
    [VANCOUVER_ISLAND, '//www.islandavalanchebulletin.com/'],
    ['jasper', '//avalanche.pc.gc.ca/bulletin-eng.aspx?r=2&d=TODAY'],
    ['waterton', '//avalanche.pc.gc.ca/bulletin-eng.aspx?r=4&d=TODAY'],
    [
        CHIC_CHOCS,
        '//avalanchequebec.ca/conditions-chic-chocs/#bulletins-avalanche',
    ],
    ['glacier', '//avalanche.pc.gc.ca/bulletin-eng.aspx?r=3&d=TODAY'],
])

export default externals

export function open(name, date) {
    if (!externals.has(name)) {
        return
    }

    let url = externals.get(name)

    if (date) {
        const parsedUrl = URL.parse(url, true)

        parsedUrl.query.d = date

        delete parsedUrl.search

        url = URL.format(parsedUrl)
    }

    try {
        window.open(url, name)
    } catch (error) {
        return
    }
}
