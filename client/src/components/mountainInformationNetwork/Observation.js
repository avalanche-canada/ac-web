import React, {createElement} from 'react'
import PropTypes from 'prop-types'
import Quick from './Quick'
import Weather from './Weather'
import Snowpack from './Snowpack'
import Avalanche from './Avalanche'
import Incident from './Incident'
import {QUICK, WEATHER, SNOWPACK, AVALANCHE, INCIDENT} from 'constants/min'

const Components = new Map([
    [QUICK, Quick],
    [WEATHER, Weather],
    [SNOWPACK, Snowpack],
    [AVALANCHE, Avalanche],
    [INCIDENT, Incident],
])

Observation.propTypes = {
    type: PropTypes.oneOf(Array.from(Components.keys())).isRequired,
    observation: PropTypes.object.isRequired,
}

export default function Observation({type, observation}) {
    return createElement(Components.get(type), observation)
}
