import React, {PropTypes} from 'react'
import {Metadata, Entry} from 'components/metadata'
import {DateTime} from 'components/misc'

HotZoneReportMetadata.propTypes = {
    report: PropTypes.object,
}

export default function HotZoneReportMetadata({report = {}}) {
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
        </Metadata>
    )
}
