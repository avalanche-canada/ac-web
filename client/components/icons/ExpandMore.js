import React from 'react'
import Icon from './Icon'

export default function ExpandMore({ inverse = false, ...props }) {
    return (
        <Icon {...props}>
            <path d='M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z' fill={inverse ? 'white' : 'black'} />
            <path d='M0 0h24v24H0z' fill='none'/>
        </Icon>
    )
}
