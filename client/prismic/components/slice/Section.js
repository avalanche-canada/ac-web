import React from 'react'
import PropTypes from 'prop-types'
import { Section as PageSection } from '~/components/page'
import { InnerHTML } from '~/components/misc'

Section.propTypes = {
    content: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default function Section({ content: [props] = [] }) {
    return (
        <PageSection {...props}>
            <InnerHTML>
                {props.content}
            </InnerHTML>
        </PageSection>
    )
}
