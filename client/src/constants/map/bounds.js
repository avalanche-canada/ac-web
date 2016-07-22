import mapboxgl from 'mapboxgl'

const {LngLatBounds, LngLat} = mapboxgl

const sw = new LngLat(-174, 35)
const ne = new LngLat(-48, 90)

export const Canadian = new LngLatBounds(sw, ne)
