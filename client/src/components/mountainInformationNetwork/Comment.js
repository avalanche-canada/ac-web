import React, {PropTypes} from 'react'
import Section from './Section'
import {Markup} from 'components/markup'

export default function Comment({children}) {
    if (!children) {
        return null
    }

    return (
        <Section title='Comments'>
            <Markup>
                {children}
            </Markup>
        </Section>
    )
}
