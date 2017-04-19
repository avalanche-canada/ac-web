import React from 'react'
import Icon from './Icon'

export default function Last({ inverse = false, ...props }) {
    return (
        <Icon {...props}>
            <path d='M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z' fill={inverse ? 'white' : 'black'} />
            <path d='M0 0h24v24H0V0z' fill='none'/>
        </Icon>
    )
}
