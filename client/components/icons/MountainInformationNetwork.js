import React from 'react'
import svg from './min/min-pin.svg'

export default function MountainInformationNetwork({
    width = 24,
    height = 24,
    ...props
}) {
    return <img width={width} height={height} {...props} src={svg} />
}
