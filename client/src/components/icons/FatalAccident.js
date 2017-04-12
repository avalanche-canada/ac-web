import React from 'react'
import fatalAccident from './fatal-accident.svg'

function FatalAccident({width = 24, height = 24, ...props}) {
    return <img width={width} height={height} {...props} src={fatalAccident} />
}

export default FatalAccident
