import React from 'react'
import Icon from './Icon'
import COLOR from 'constants/colors'

export default function ChevronLeft({ color = COLOR, ...props }) {
    return (
        <Icon {...props}>
            <path
                d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
                fill={color}
            />
            <path d="M0 0h24v24H0z" fill="none" />
        </Icon>
    )
}
