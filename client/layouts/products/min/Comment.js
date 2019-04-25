import React from 'react'
import PropTypes from 'prop-types'
import Section from './Section'
import { MultiLine } from 'components/markup'

Comment.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
}

export default function Comment({ title = 'Comments', children }) {
    if (!children) {
        return null
    }

    return (
        <Section title={title}>
            <MultiLine>{children}</MultiLine>
        </Section>
    )
}
