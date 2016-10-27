import React, {PropTypes} from 'react'
import {Element} from 'compose'
import styles from './Markup.css'

Markup.propTypes = {
    children: PropTypes.string,
}

export function Markup({children}) {
    if (!children) {
        return null
    }

    const parts = children.replace(/\r/g, '').split(/\n/)

    return (
        <div>
            {parts.map(text => [text, <br/>])}
        </div>
    )
}

export const Credit = Element({
    name: 'Credit',
    styles,
})
