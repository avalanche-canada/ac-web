import React from 'react'
import Icon from './Icon'
import COLOR from 'constants/colors'

export default function ExpandMore({ color = COLOR, ...props }) {
    return (
        <Icon {...props}>
            <path
                d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
                fill={color}
            />
            <path d="M0 0h24v24H0z" fill="none" />
        </Icon>
    )
}
