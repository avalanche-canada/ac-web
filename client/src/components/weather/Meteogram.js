import React, {PropTypes} from 'react'
import {compose, withProps, mapProps, setPropTypes, setDisplayName} from 'recompose'
import padstart from 'lodash/padStart'
import {Image} from 'components/misc'
import {domain} from './config.json'

const POINT_LOCATIONS = new Set(["Seven.Seas@Big.Horn", "Castle.Creek@Cariboos", "Crystal.Ridge@Cariboos", "Mt.St.Anne@Cariboos", "Sliding.Mtn@Cariboos", "Bonnington@Kootenay.Boundary", "Kootenay.Pass@Kootenay.Boundary", "Moyie@Kootenay.Boundary", "Mt.Crowe@Kootenay.Boundary", "Sherpa@Kootenay.Boundary", "Corbin@Lizard.Range", "Harvey@Lizard.Range", "Lizard@Lizard.Range", "Starvation.Mtn@Lizard.Range", "Three.Sisters@Lizard.Range", "Tunnel.Creek@Lizard.Range", "Albreda@North.Columbia", "Anstey@North.Columbia", "Caribou.Ridge@North.Columbia", "Chapman@North.Columbia", "Fidelity@North.Columbia", "Core.Lodge @North.Rockies", "Kakwa.East@North.Rockies", "Kakwa@North.Rockies", "Mt.Murray@North.Rockies", "Renshaw@North.Rockies", "Torpy@North.Rockies", "Cypress@North.Shore", "Seymour@North.Shore", "Kasiks@NW.Coastal", "Legate.Pk@NW.Coastal", "Mt.Madden.Kitimat@NW.Coastal", "Shames@NW.Coastal", "Windy.Point@NW.Coastal", "Gamma@NW.Inland", "Hudson.Bay.Mtn@NW.Inland", "Kispiox@NW.Inland", "Sinclair@NW.Inland", "Snowbank@NW.Inland", "CMH.Bugs@Purcells", "Gray.Creek@Purcells", "Hellroaring@Purcells", "Panorama@Purcells", "Whitetooth@Purcells", "Amicus.Pk@Sea.to.Sky", "Brohm.Ridge@Sea.to.Sky", "Meager.Ck@Sea.to.Sky", "Whistler@Sea.to.Sky", "Allison.Pass@South.Coast.Inland", "Blowdown@South.Coast.Inland", "Cayoosh@South.Coast.Inland", "Hurley@South.Coast.Inland", "Rex.Mtn@South.Coast.Inland", "Yak.Pk@South.Coast.Inland", "Fidelity@South.Columbia", "Kokanee@South.Columbia", "London.Ridge@South.Columbia", "Tsuius@South.Columbia", "Valkyr@South.Columbia", "Crown.Mtn@South.Rockies", "Gravenstafel@South.Rockies", "Mear.Lake@South.Rockies", "Mt.Rowe@South.Rockies", "Summer.Lake@South.Rockies", "Window.Mtn@South.Rockies", "Fraser@Yukon", "Log.Cabin@Yukon", "Paddy.Peak@Yukon", "Tally.Ho.Mtn@Yukon", "White.Pass.East@Yukon", "White.Pass@Yukon"])
const GROUP_LOCATIONS = new Set(["Big.Horn", "Cariboos", "Kootenay.Boundary", "Lizard.Range", "North.Columbia", "North.Rockies", "North.Shore", "NW.Coastal", "NW.Inland", "Purcells", "Sea.to.Sky", "South.Coast.Inland", "South.Columbia", "South.Rockies", "Yukon"])

const RDPS = 'RDPS'
const GDPS = 'GDPS'
const HRDPS = 'HRDPS'

const POINT = 'point'
const GROUP = 'group'

const PREFIXES = new Map([
    [RDPS, 'GEMr'],
    [GDPS, 'GEMg'],
    [HRDPS, 'LAMw'],
])

const propTypes = {
    model: PropTypes.oneOf([RDPS, GDPS, HRDPS]),
    run: PropTypes.oneOf([0, 6, 12, 18]),
    product: PropTypes.oneOf([POINT, GROUP]),
    location: PropTypes.oneOf([...[...POINT_LOCATIONS], ...[...GROUP_LOCATIONS]]),
}

export function formatUrl({ model, run, location }) {
    if (!PREFIXES.has(model)) {
        throw new TypeError(`${model} is not recognized model.`)
    }

    if (GROUP_LOCATIONS.has(location)) {
        location = location + '_CACreg'
    } else {
        const [point, group] = location.split('@')

        location = `${group}_${point}`
    }

    const prefix = PREFIXES.get(model)
    run = padstart(String(run), 2, '0')

    return `${domain}/cac/products/${prefix}.${run}Z_${location}.png`
}

export default compose(
    setDisplayName('Meteogram'),
    withProps({
        openNewTab: true,
    }),
    setPropTypes(propTypes),
    mapProps(props => ({
        src: formatUrl(props)
    })),
)(Image)
