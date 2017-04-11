import React from 'react'
import PropTypes from 'prop-types'
import {Metadata, Entry, ShareEntry} from '/components/metadata'
import {DateElement} from '/components/misc'
import {DATETIME} from '/utils/date'

export function DateIssued({dateIssued}) {
    return (
        <Entry term='Date Issued'>
            <DateElement format={DATETIME} value={dateIssued} />
        </Entry>
    )
}

export function ValidUntil({validUntil}) {
    return (
        <Entry term='Valid Until'>
            <DateElement format={DATETIME} value={validUntil} />
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
