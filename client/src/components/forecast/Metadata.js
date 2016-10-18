import React, {PropTypes} from 'react'
import {Metadata, Entry} from 'components/metadata'
import {DateElement} from 'components/misc'

ForecastMetadata.propTypes = {
    dateIssued: PropTypes.instanceOf(Date).isRequired,
    validUntil: PropTypes.instanceOf(Date).isRequired,
    forecaster: PropTypes.string,
}

export default function ForecastMetadata({dateIssued, validUntil, forecaster}) {
    return (
        <Metadata>
            <Entry term='Date Issued'>
                <DateElement format="dddd MMMM Do, HH:mm, YYYY" value={dateIssued} />
            </Entry>
            <Entry term='Valid Until'>
                <DateElement format="dddd MMMM Do, HH:mm, YYYY" value={validUntil} />
            </Entry>
            <Entry term='Prepared by'>
                {forecaster}
            </Entry>
        </Metadata>
    )
}
