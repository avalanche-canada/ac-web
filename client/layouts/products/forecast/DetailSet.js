import React from 'react'
import { useReport } from './Context'
import { InnerHTML } from 'components/misc'
import Summary from './Summary'

export default function DetailSet() {
    const report = useReport()

    return report ? report.summaries.map(render) : null
}

function render({ title, content }) {
    return (
        <Summary key={title} title={title}>
            <InnerHTML>{content}</InnerHTML>
        </Summary>
    )
}
