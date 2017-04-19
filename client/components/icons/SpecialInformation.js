import React from 'react'
import specialInformation from './special-information.svg'

export default function SpecialInformation({width = 24, height = 24, ...props}) {
    return <img width={width} height={height} {...props} src={specialInformation} />
}
