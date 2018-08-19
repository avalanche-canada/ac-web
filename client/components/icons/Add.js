import React from 'react'
import Icon from './Icon'
import COLOR from 'constants/colors'

export default function Add({ color = COLOR, ...props }) {
    return (
        <Icon {...props}>
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill={color} />
            <path d="M0 0h24v24H0z" fill="none" />
        </Icon>
    )
}
