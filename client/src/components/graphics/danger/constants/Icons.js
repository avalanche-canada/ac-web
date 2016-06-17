import React from 'react'
import * as GROUPS from './IconGroups'

function Svg({ width, height, children }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height}>
            {children.props.children}
        </svg>
    )
}

export const LOW = (
    <Svg width={81.62} height={81.62}>
        {GROUPS.LOW}
    </Svg>
)

export const MODERATE = (
    <Svg width={81.62} height={81.61}>
        {GROUPS.MODERATE}
    </Svg>
)

export const CONSIDERABLE = (
    <Svg width={98.38} height={81.61}>
        {GROUPS.CONSIDERABLE}
    </Svg>
)

export const HIGH = (
    <Svg width={113.31} height={81.62}>
        {GROUPS.HIGH}
    </Svg>
)

export const EXTREME = HIGH

export const NOTHING = (
    <Svg width={82.46} height={82.47}>
        {GROUPS.NOTHING}
    </Svg>
)
