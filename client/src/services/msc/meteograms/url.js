import padstart from 'lodash/padStart'
import {meteogram} from 'services/msc/config.json'

export function formatUrl({model, run, location}) {
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

    return `${meteogram}/cac/products/${prefix}.${run}Z_${location}.png`
}
