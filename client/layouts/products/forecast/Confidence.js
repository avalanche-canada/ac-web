import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useReport } from './Context'
import Summary from './Summary'

export default function Confidence() {
    const { confidence } = useReport()

    if (!confidence) {
        return null
    }

    const { rating, statements } = confidence
    const title = (
        <dl>
            <dt>
                <FormattedMessage defaultMessage="Confidence" />
            </dt>
            <dd>{rating?.display}</dd>
        </dl>
    )

    return (
        <Summary title={title}>
            {Array.isArray(statements) ? (
                <ul>
                    {statements.map((statement, index) => (
                        <li key={index}>{statement}</li>
                    ))}
                </ul>
            ) : null}
        </Summary>
    )
}
