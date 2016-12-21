import React, {PropTypes} from 'react'
import {Metadata, Entry, ShareEntry} from 'components/metadata'
import {DateTime} from 'components/misc'

HotZoneReportMetadata.propTypes = {
    report: PropTypes.object,
    shareUrl: PropTypes.string,
}

export default function HotZoneReportMetadata({report, shareUrl}) {
    if (!report) {
        return null
    }

    const {dateOfIssue, validUntil} = report

    return (
        <Metadata>
            <Entry term='Date Issued'>
                <DateTime value={dateOfIssue} />
            </Entry>
            <Entry term='Valid Until'>
                <DateTime value={validUntil} />
            </Entry>
            {shareUrl && <ShareEntry url={shareUrl} />}
            {shareUrl && <Entry />}
        </Metadata>
    )
}
