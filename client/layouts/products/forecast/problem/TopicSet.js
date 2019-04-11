import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { useClientRect } from 'utils/react/hooks'
import styles from './Problem.css'

TopicSet.propTypes = {
    children: PropTypes.node.isRequired,
}

export default function TopicSet({ children }) {
    const [{ width }, ref] = useClientRect({ width: window.innerWidth })
    const className = classNames({
        TopicSet: true,
        'TopicSet--2PerRow': width > 300 && width < 650,
        'TopicSet--4PerRow': width > 650,
    })

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    )
}

const classNames = classnames.bind(styles)
