import React from 'react'
import Icon from './Icon'

export default function Add({ inverse = false, ...props }) {
    return (
        <Icon {...props}>
            <path
                d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
                fill={inverse ? 'white' : 'black'}
            />
            <path d="M0 0h24v24H0z" fill="none" />
        </Icon>
    )
}
