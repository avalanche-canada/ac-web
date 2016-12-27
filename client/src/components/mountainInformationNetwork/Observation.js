import React, {PropTypes, createElement} from 'react'
import Quick from './Quick'
import Weather from './Weather'
import Snowpack from './Snowpack'
import Avalanche from './Avalanche'
import Incident from './Incident'
import * as Types from './types'

const Components = new Map([
    [Types.QUICK, Quick],
    [Types.WEATHER, Weather],
    [Types.SNOWPACK, Snowpack],
    [Types.AVALANCHE, Avalanche],
    [Types.INCIDENT, Incident],
])

Observation.propTypes = {
    type: PropTypes.oneOf(Array.from(Components.keys())).isRequired,
    observation: PropTypes.object.isRequired,
}

export default function Observation({type, observation}) {
    return createElement(Components.get(type), observation)
}
