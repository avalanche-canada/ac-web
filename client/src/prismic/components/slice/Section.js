import React from 'react'
import PropTypes from 'prop-types'
import {Section as PageSection} from 'components/page'
import {InnerHTML} from 'components/misc'

export default function Section({content: [props], label}) {
    return (
        <PageSection {...props} >
            <InnerHTML>
                {props.content}
            </InnerHTML>
        </PageSection>
    )
}
