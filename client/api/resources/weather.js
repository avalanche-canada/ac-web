import { unstable_createResource as createResource } from 'react-cache'
import { station, stations, measurements } from 'api/requests/weather'
import fetch from 'services/fetch'

export const Station = createResource(id => fetch(station(id)))
export const Stations = createResource(() => fetch(stations()).then(sort))
export const Measurements = createResource(id => fetch(measurements()))

// Utils
function sort(data) {
    return Array.isArray(data) ? data.sort(sorter) : data
}
function sorter(a, b) {
    return a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
}
