
import ReactGA from 'react-ga'
import mapbox from 'services/mapbox/map'
import {googleAnalyticsId} from './config.json'

// Set in the google analytics custom dimentions
//  Needs to use the dimention<n> settings
//  it will be named correctly in the UI
const MAPBOXGL_SUPPORTED = 'dimension1'

const gaOptions = process.env.NODE_ENV === 'production' ? {} : {debug:true}

ReactGA.initialize(googleAnalyticsId, gaOptions)

ReactGA.set({[MAPBOXGL_SUPPORTED]: mapbox.supported()})

export default ReactGA
