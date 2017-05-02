import React from 'react'
import Icon from './Icon'

export default function First({ inverse = false, ...props }) {
    return (
        <Icon {...props}>
            <path d="M19 13H5v-2h14v2z" fill={inverse ? 'white' : 'black'} />
            <path d="M0 0h24v24H0z" fill="none" />
        </Icon>
    )
}
