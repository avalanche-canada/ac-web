import React, {PropTypes} from 'react'
import {Section as PageSection} from 'components/page'
import {InnerHTML} from 'components/misc'

export default function Section({content, label}) {
    const props = content[0]

    return (
        <PageSection {...props} >
            <InnerHTML>
                {props.content}
            </InnerHTML>
        </PageSection>
    )
}
