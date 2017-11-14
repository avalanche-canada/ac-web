import React from 'react'
import svg from './mountain-conditions-report.svg'

export default function MountainConditionsReport({
    width = 24,
    height = 24,
    ...props
}) {
    return <img width={width} height={height} {...props} src={svg} />
}
