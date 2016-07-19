import mapboxgl, {styles} from 'mapboxgl'

const {LngLatBounds, LngLat} = mapboxgl

const sw = new LngLat(-174, 35)
const ne = new LngLat(-48, 90)

export const CanadianBounds = new LngLatBounds(sw, ne)

export const RevelstokeCenter = [-118.1957, 50.9981]
