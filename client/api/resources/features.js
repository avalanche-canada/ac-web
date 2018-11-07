import { unstable_createResource as createResource } from 'react-cache'
import { metadata } from 'api/requests/metadata'
import fetch from 'services/fetch'

const Metadata = createResource(() => fetch(metadata()))

export const Region = {
    ...Metadata,
    read(name) {
        try {
            const metadata = Metadata.read()

            return metadata[FORECAST_REGIONS][name]
        } catch (promise) {
            throw promise
        }
    },
}

export const Regions = {
    ...Metadata,
    read() {
        try {
            const metadata = Metadata.read()

            return Object.values(metadata[FORECAST_REGIONS]).sort(sorter)
        } catch (promise) {
            throw promise
        }
    },
}

export const HotZone = {
    ...Metadata,
    read(name) {
        try {
            const metadata = Metadata.read()

            return metadata[HOT_ZONES][name]
        } catch (promise) {
            throw promise
        }
    },
}

export const HotZones = {
    ...Metadata,
    read(all) {
        try {
            const metadata = Metadata.read()

            return Object.values(metadata[HOT_ZONES])
                .filter(({ id }) => (all ? true : id === 'yukon'))
                .sort(sorter)
        } catch (promise) {
            throw promise
        }
    },
}

const FORECAST_REGIONS = 'forecast-regions'
const HOT_ZONES = 'hot-zones'
function sorter(a, b) {
    return a.name.localeCompare(b.name)
}
