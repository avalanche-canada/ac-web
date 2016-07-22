import React from 'react'
import {compose, setDisplayName, withProps} from 'recompose'
import Icon from '../Icon'
import * as COLORS from './colors'

function Path(props) {
    return (
        <path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z' {...props} />
    )
}

function marker(name, fill) {
    return compose(
        setDisplayName(name),
        withProps({
            children: <Path fill={fill} />
        })
    )(Icon)
}



export const Quick = marker('Quick', COLORS.QUICK)
export const Avalanche = marker('Avalanche', COLORS.AVALANCHE)
export const Snowpack = marker('Snowpack', COLORS.SNOWPACK)
export const Weather = marker('Weather', COLORS.WEATHER)
export const Incident = marker('Incident', COLORS.INCIDENT)
