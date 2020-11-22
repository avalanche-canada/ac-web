import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useReport } from './Context'
import { Metadata, TimestampEntry } from 'components/metadata'

export default function AdvisoryMetadata() {
    const report = useReport()

    return report ? (
        <Metadata>
            <TimestampEntry
                term={
                    <FormattedMessage
                        description="Layout products/advisory/Metadata"
                        defaultMessage="Date Issued"
                    />
                }
                value={report.data.dateOfIssue}
            />
            <TimestampEntry
                term={
                    <FormattedMessage
                        description="Layout products/advisory/Metadata"
                        defaultMessage="Valid Until"
                    />
                }
                value={report.data.validUntil}
            />
            {report.data.dateUpdated && (
                <TimestampEntry
                    term={
                        <FormattedMessage
                            description="Layout products/advisory/Metadata"
                            defaultMessage="Date Updated"
                        />
                    }
                    value={report.data.dateUpdated}
                />
            )}
        </Metadata>
    ) : null
}
