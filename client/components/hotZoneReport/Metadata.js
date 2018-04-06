import React from 'react'
import PropTypes from 'prop-types'
import { Metadata, ShareEntry, TimestampEntry } from 'components/metadata'

HotZoneReportMetadata.propTypes = {
    dateOfIssue: PropTypes.instanceOf(Date).isRequired,
    validUntil: PropTypes.instanceOf(Date).isRequired,
    dateUpdated: PropTypes.instanceOf(Date),
    shareUrl: PropTypes.string,
}

export default function HotZoneReportMetadata({
    dateOfIssue,
    validUntil,
    dateUpdated,
    shareUrl,
}) {
    return (
        <Metadata>
            <TimestampEntry term="Date Issued" value={dateOfIssue} />
            <TimestampEntry term="Valid Until" value={validUntil} />
            {dateUpdated && (
                <TimestampEntry term="Date Updated" value={dateUpdated} />
            )}
            {shareUrl && <ShareEntry url={shareUrl} />}
        </Metadata>
    )
}
