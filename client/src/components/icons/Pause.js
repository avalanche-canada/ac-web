import React, { PropTypes } from 'react'
import Icon from './Icon'
import { pure } from 'recompose'

function Pause({ inverse = false, ...props }) {
	return (
		<Icon {...props}>
			<path d='M6 19h4V5H6v14zm8-14v14h4V5h-4z' fill={inverse ? 'white' : 'black'}/>
		    <path d='M0 0h24v24H0z' fill='none'/>
		</Icon>
	)
}

export default pure(Pause)
