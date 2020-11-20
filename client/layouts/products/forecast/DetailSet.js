import React from 'react'
import { useReport } from './Context'
import { InnerHTML } from 'components/misc'
import Summary from './Summary'

export default function DetailSet() {
    const report = useReport()

    return report.summaries.map(({ type, content }) => (
        <Summary key={type.value} title={type.display}>
            <InnerHTML>{content}</InnerHTML>
        </Summary>
    ))
}
