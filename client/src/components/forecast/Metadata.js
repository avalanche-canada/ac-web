import React, {PropTypes} from 'react'
import {Metadata, Entry, ShareEntry} from 'components/metadata'
import {DateElement} from 'components/misc'

export function DateIssued({dateIssued}) {
    return (
        <Entry term='Date Issued'>
            <DateElement format="dddd MMMM Do, HH:mm, YYYY" value={dateIssued} />
        </Entry>
    )
}

export function ValidUntil({validUntil}) {
    return (
        <Entry term='Valid Until'>
            <DateElement format="dddd MMMM Do, HH:mm, YYYY" value={validUntil} />
        </Entry>
    )
}

export function Forecaster({forecaster}) {
    return (
        <Entry term='Prepared by'>
            {forecaster}
        </Entry>
    )
}

ForecastMetadata.propTypes = {
    dateIssued: PropTypes.instanceOf(Date).isRequired,
    validUntil: PropTypes.instanceOf(Date).isRequired,
    forecaster: PropTypes.string,
    shareUrl: PropTypes.string,
}

export default function ForecastMetadata({shareUrl, ...props}) {
    return (
        <Metadata>
            <DateIssued {...props} />
            <ValidUntil {...props} />
            <Forecaster {...props} />
            {shareUrl && <ShareEntry url={shareUrl} />}
        </Metadata>
    )
}
