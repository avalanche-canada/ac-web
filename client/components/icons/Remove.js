import React from 'react'
import Icon from './Icon'
import COLOR from 'constants/colors'

export default function First({ color = COLOR, ...props }) {
    return (
        <Icon {...props}>
            <path d="M19 13H5v-2h14v2z" fill={color} />
            <path d="M0 0h24v24H0z" fill="none" />
        </Icon>
    )
}
