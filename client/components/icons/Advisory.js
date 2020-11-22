import React from 'react'
import src from './hot-zone-report.svg'

export default function Advisory({ width = 24, height = 24, ...props }) {
    return <img width={width} height={height} {...props} src={src} />
}
