import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { useClientRect } from 'hooks'
import css from './Problem.css'

TopicSet.propTypes = {
    children: PropTypes.node.isRequired,
}

export default function TopicSet({ children }) {
    const [{ width }, ref] = useClientRect({ width: window.innerWidth })
    const className = classnames({
        [css.TopicSet]: true,
        [css['TopicSet--2PerRow']]: width > 300 && width < 650,
        [css['TopicSet--4PerRow']]: width > 650,
    })

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    )
}
