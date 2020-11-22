import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useReport } from './Context'
import { InnerHTML } from 'components/misc'
import Summary from './Summary'

export default function DetailSet() {
    const { summaries } = useReport()

    if (!Array.isArray(summaries) || summaries.length === 0) {
        return (
            <h3>
                <FormattedMessage
                    description="Layout product/forecast/details"
                    defaultMessage="No details found."
                />
            </h3>
        )
    }

    return summaries.map(({ type, content }) => (
        <Summary key={type.value} title={type.display}>
            <InnerHTML>{content}</InnerHTML>
        </Summary>
    ))
}
