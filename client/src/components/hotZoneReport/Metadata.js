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
                <DateTime value={dateIssued} format='EEE MMMM d, h:mm a' />
            </Entry>
            <Entry term='Valid Until'>
                <DateTime value={validUntil} format='EEE MMMM d, h:mm a' />
            </Entry>
        </Metadata>
    )
}
