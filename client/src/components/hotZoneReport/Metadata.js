import React, {PropTypes} from 'react'
import {Metadata, Entry} from 'components/metadata'
import {DateTime} from 'components/misc'

HotZoneReportMetadata.propTypes = {
    dateIssued: PropTypes.instanceOf(Date).isRequired,
    validUntil: PropTypes.instanceOf(Date).isRequired,
}

export default function HotZoneReportMetadata({dateIssued, validUntil}) {
    return (
        <Metadata>
            <Entry term='Date Issued'>
                <DateTime value={dateIssued} />
            </Entry>
            <Entry term='Valid Until'>
                <DateTime value={validUntil} />
            </Entry>
        </Metadata>
    )
}
