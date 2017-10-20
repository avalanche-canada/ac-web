import React from 'react'
import PropTypes from 'prop-types'
import {
    Metadata,
    Entry,
    ShareEntry,
    TimestampEntry,
} from 'components/metadata'
import { DateTime } from 'components/time'

HotZoneReportMetadata.propTypes = {
    report: PropTypes.object,
    shareUrl: PropTypes.string,
}

export default function HotZoneReportMetadata({ report, shareUrl }) {
    if (!report) {
        return null
    }

    const { dateOfIssue, validUntil, dateUpdated } = report

    return (
        <Metadata>
            <Entry term="Date Issued">
                <DateTime value={dateOfIssue} />
            </Entry>
            <Entry term="Valid Until">
                <DateTime value={validUntil} />
            </Entry>
            <TimestampEntry
                term="Date Updated"
                timestamp={dateUpdated}
                hideIfNil
            />
            {shareUrl && <ShareEntry url={shareUrl} />}
        </Metadata>
    )
}
