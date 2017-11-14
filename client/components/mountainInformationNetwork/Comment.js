import React from 'react'
import PropTypes from 'prop-types'
import Section from './Section'
import { Markup } from 'components/markup'

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
            {typeof children === 'string'
                ? <Markup>
                      {children}
                  </Markup>
                : children}
        </Section>
    )
}
