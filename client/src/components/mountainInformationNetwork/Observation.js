import React, {PropTypes, createElement} from 'react'
import Quick from './Quick'
import Weather from './Weather'
import Snowpack from './Snowpack'
import Avalanche from './Avalanche'
import Incident from './Incident'
import {QUICK, WEATHER, SNOWPACK, AVALANCHE, INCIDENT} from './types'

const Components = new Map([
    [QUICK, Quick],
    [WEATHER, Weather],
    [SNOWPACK, Snowpack],
    [AVALANCHE, Avalanche],
    [INCIDENT, Incident],
])

Observation.propTypes = {
    type: PropTypes.oneOf([QUICK, WEATHER, SNOWPACK, AVALANCHE, INCIDENT]).isRequired,
    observation: PropTypes.object.isRequired,
}

export default function Observation({type, observation}) {
    return createElement(Components.get(type), observation)
}
