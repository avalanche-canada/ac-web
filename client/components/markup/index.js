import React, { DOM } from 'react'
import PropTypes from 'prop-types'
import { Element } from '~/compose'
import styles from './Markup.css'

Markup.propTypes = {
    children: PropTypes.node,
}

export function Markup({ children }) {
    if (!children) {
        return null
    }

    if (typeof children === 'string') {
        const parts = children.replace(/\r/g, '').split(/\n/)

        return (
            <div>
                {parts.map(text => [text, <br />])}
            </div>
        )
    }

    return children
}

export const Credit = Element({
    name: 'Credit',
    component: DOM.small,
    styles,
})
