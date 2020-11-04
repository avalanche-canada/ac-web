import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useReport } from './Context'
import Summary from './Summary'

export default function Confidence() {
    const report = useReport()

    if (!report?.confidence?.ratings) {
        return null
    }

    const { ratings, statements } = report.confidence
    const title = (
        <dl>
            <dt>
                <FormattedMessage defaultMessage="Confidence" />
            </dt>
            <dd>{ratings}</dd>
        </dl>
    )

    return (
        <Summary title={title}>
            <ul>
                {statements.map((statement, index) => (
                    <li key={index}>{statement}</li>
                ))}
            </ul>
        </Summary>
    )
}
