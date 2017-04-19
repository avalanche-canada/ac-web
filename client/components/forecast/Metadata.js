import React from 'react'
import PropTypes from 'prop-types'
import {Metadata, Entry, ShareEntry} from '~/components/metadata'
import {DateElement} from '~/components/misc'
import {DATETIME} from '~/utils/date'

DateIssued.propTypes = {
    dateIssued: PropTypes.instanceOf(Date).isRequired,
}

export function DateIssued({dateIssued}) {
    return (
        <Entry term='Date Issued'>
            <DateElement format={DATETIME} value={dateIssued} />
        </Entry>
    )
}

ValidUntil.propTypes = {
    validUntil: PropTypes.instanceOf(Date).isRequired,
}

export function ValidUntil({validUntil}) {
    return (
        <Entry term='Valid Until'>
            <DateElement format={DATETIME} value={validUntil} />
        </Entry>
    )
}

Forecaster.propTypes = {
    forecaster: PropTypes.string.isRequired,
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
