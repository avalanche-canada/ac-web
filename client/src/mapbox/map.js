import {accessToken} from './config.json'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

export default Object.assign(mapboxgl, {accessToken})

export {styles} from './config.json'
