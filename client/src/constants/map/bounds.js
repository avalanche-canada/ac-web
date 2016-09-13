import mapbox from 'mapbox/map'

const {LngLatBounds, LngLat} = mapbox

const sw = new LngLat(-174, 35)
const ne = new LngLat(-48, 90)

export const Canadian = new LngLatBounds(sw, ne)
