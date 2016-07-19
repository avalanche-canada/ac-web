import React from 'react'
import Remarkable from 'react-remarkable'

export default function Markdown({content}) {
    return (
        <Remarkable>
            {content}
        </Remarkable>
    )
}
