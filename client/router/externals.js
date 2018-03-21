import URL from 'url'

const externals = new Map([
    ['little-yoho', 'http://avalanche.pc.gc.ca/bulletin-eng.aspx?r=5&d=TODAY'],
    [
        'banff-yoho-kootenay',
        'http://avalanche.pc.gc.ca/bulletin-eng.aspx?r=1&d=TODAY',
    ],
    ['vancouver-island', 'http://www.islandavalanchebulletin.com/'],
    ['jasper', 'http://avalanche.pc.gc.ca/bulletin-eng.aspx?r=2&d=TODAY'],
    ['waterton', 'http://avalanche.pc.gc.ca/bulletin-eng.aspx?r=4&d=TODAY'],
    [
        'chic-chocs',
        'https://avalanchequebec.ca/conditions-chic-chocs/#bulletins-avalanche',
    ],
    ['glacier', 'http://avalanche.pc.gc.ca/bulletin-eng.aspx?r=3&d=TODAY'],
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
