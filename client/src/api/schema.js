import Axios from 'axios'

const api = Axios.create({
    baseURL: 'http://www.avalanche.ca/schema/'
})

export function fetchMountainInformationNetwork(version = '16.09') {
    return api.get(`min-${version}`)
}

export function fetchHotZoneReport(version) {
    return api.get(`hzr-${version}`)
}
