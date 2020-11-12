import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { useReport } from './Context'
import { Metadata, ShareEntry, TimestampEntry } from 'components/metadata'
import * as utils from 'utils/hzr'

HotZoneReportMetadata.propTypes = {
    shareable: PropTypes.bool,
}

export default function HotZoneReportMetadata({ shareable }) {
    const report = useReport()

    return report ? (
        <Metadata>
            <TimestampEntry
                term={
                    <FormattedMessage
                        description="Layout products/hzr/Metadata"
                        defaultMessage="Date Issued"
                    />
                }
                value={report.data.dateOfIssue}
            />
            <TimestampEntry
                term={
                    <FormattedMessage
                        description="Layout products/hzr/Metadata"
                        defaultMessage="Valid Until"
                    />
                }
                value={report.data.validUntil}
            />
            {report.data.dateUpdated && (
                <TimestampEntry
                    term={
                        <FormattedMessage
                            description="Layout products/hzr/Metadata"
                            defaultMessage="Date Updated"
                        />
                    }
                    value={report.data.dateUpdated}
                />
            )}
            {shareable && <ShareEntry url={utils.shareUrl(report)} />}
        </Metadata>
    ) : null
}
