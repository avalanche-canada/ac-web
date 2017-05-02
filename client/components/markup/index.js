import React from 'react'
import PropTypes from 'prop-types'
import { Element } from '~/compose'
import styles from './Markup.css'

Markup.propTypes = {
    children: PropTypes.string,
}

export function Markup({ children }) {
    if (!children) {
        return null
    }

    if (typeof children !== 'string') {
        return children
    }

    const parts = children.replace(/\r/g, '').split(/\n/)

    return (
        <div>
            {parts.map(text => [text, <br />])}
        </div>
    )
}

export const Credit = Element({
    name: 'Credit',
    styles,
})
