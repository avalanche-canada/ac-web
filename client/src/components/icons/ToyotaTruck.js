import React from 'react'
import toyotaTruck from './toyota-truck.svg'

export default function ToyotaTruck({width = 24, height = 24, ...props}) {
    return <img width={width} height={height} {...props} src={toyotaTruck} />
}
