import React from 'react'
import Icon from './Icon'

export default function ExpandLess({ inverse = false, ...props }) {
    return (
        <Icon {...props}>
            <path d='M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z' fill={inverse ? 'white' : 'black'} />
            <path d='M0 0h24v24H0z' fill='none'/>
        </Icon>
    )
}
