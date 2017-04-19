import React from 'react'
import Icon from './Icon'

export default function Play({ inverse = false, ...props }) {
    return (
        <Icon {...props}>
            <path d='M8 5v14l11-7z' fill={inverse ? 'white' : 'black'} />
            <path d='M0 0h24v24H0z' fill='none'/>
        </Icon>
    )
}
