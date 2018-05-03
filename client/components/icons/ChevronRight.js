import React from 'react'
import Icon from './Icon'
import COLOR from 'constants/colors'

export default function ChevronRight({ color = COLOR, ...props }) {
    return (
        <Icon {...props}>
            <path
                d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
                fill={color}
            />
            <path d="M0 0h24v24H0z" fill="none" />
        </Icon>
    )
}
