import React from 'react'
import min from './min/min-pin.svg'

function MountainInformationNetwork({width = 24, height = 24, ...props}) {
	return <img width={width} height={height} {...props} src={min} />
}

export default MountainInformationNetwork
