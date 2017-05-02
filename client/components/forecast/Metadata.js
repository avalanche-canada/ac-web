import React from 'react'
import PropTypes from 'prop-types'
import { Metadata, Entry, ShareEntry } from '~/components/metadata'
import { DateElement } from '~/components/misc'
import { DATETIME } from '~/utils/date'
import differenceInDays from 'date-fns/difference_in_days'
import { FURTHER_NOTICE_DAYS } from '~/constants/forecast/time'

DateIssued.propTypes = {
    dateIssued: PropTypes.instanceOf(Date).isRequired,
}

export function DateIssued({ dateIssued }) {
    return (
        <Entry term="Date Issued">
            <DateElement format={DATETIME} value={dateIssued} />
        </Entry>
    )
}

ValidUntil.propTypes = {
    validUntil: PropTypes.instanceOf(Date).isRequired,
}

export function ValidUntil({ validUntil }) {
    const now = new Date()
    var el = <DateElement format={DATETIME} value={validUntil} />
    if (differenceInDays(now, validUntil) > FURTHER_NOTICE_DAYS) {
        el = <span>Until further notice</span>
    }
    return (
        <Entry term="Valid Until">
            {el}
        </Entry>
    )
}

Forecaster.propTypes = {
    forecaster: PropTypes.string.isRequired,
}

export function Forecaster({ forecaster }) {
    return (
        <Entry term="Prepared by">
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

export default function ForecastMetadata({ shareUrl, ...props }) {
    return (
        <Metadata>
            <DateIssued {...props} />
            <ValidUntil {...props} />
            <Forecaster {...props} />
            {shareUrl && <ShareEntry url={shareUrl} />}
        </Metadata>
    )
}
