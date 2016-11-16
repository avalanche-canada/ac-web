import React, {PropTypes} from 'react'
import {Metadata, Entry, ShareEntry} from 'components/metadata'
import {DateTime} from 'components/misc'

HotZoneReportMetadata.propTypes = {
    report: PropTypes.object,
    shareUrl: PropTypes.string,
}

export default function HotZoneReportMetadata({report = {}, shareUrl}) {
    const {dateissued, datevalid} = report

    if (!dateissued && !datevalid) {
        return null
    }

    return (
        <Metadata>
            <Entry term='Date Issued'>
                <DateTime value={dateissued} />
            </Entry>
            <Entry term='Valid Until'>
                <DateTime value={datevalid} />
            </Entry>
            {shareUrl && <ShareEntry url={shareUrl} />}
            {shareUrl && <Entry />}
        </Metadata>
    )
}
