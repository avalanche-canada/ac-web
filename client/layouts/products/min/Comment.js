import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import Section from './Section'
import { MultiLine } from 'components/misc'

Comment.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
}

export default function Comment({
    title = <FormattedMessage defaultMessage="Comments" />,
    children,
}) {
    if (!children) {
        return null
    }

    return (
        <Section title={title}>
            <MultiLine>{children}</MultiLine>
        </Section>
    )
}
