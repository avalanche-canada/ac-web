import React from 'react'
import Icon from './Icon'
import COLOR from 'constants/colors'

export default function ExpandLess({ color = COLOR, ...props }) {
    return (
        <Icon {...props}>
            <path
                d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"
                fill={color}
            />
            <path d="M0 0h24v24H0z" fill="none" />
        </Icon>
    )
}
