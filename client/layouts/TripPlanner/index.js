import supported from '@mapbox/mapbox-gl-supported'
import Unsupported from './Unsupported'
import Layout from './Layout'

export default (supported() ? Layout : Unsupported)
