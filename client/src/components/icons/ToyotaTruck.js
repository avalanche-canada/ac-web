import React from 'react'
import toyotaTruck from './toyota-truck.svg'

function ToyotaTruck({width = 24, height = 24, ...props}) {
    return <img width={width} height={height} {...props} src={toyotaTruck} />
}

export default ToyotaTruck
