import React from 'react'
import PropTypes from 'prop-types'
import { useForecast } from './Context'
import { DateTime } from 'components/time'
import {
    Metadata,
    Entry,
    ShareEntry,
    TimestampEntry,
} from 'components/metadata'
import differenceInDays from 'date-fns/difference_in_days'

ForecastMetadata.propTypes = {
    shareUrl: PropTypes.string,
}

export default function ForecastMetadata({ shareUrl }) {
    const forecast = useForecast()

    return forecast ? (
        <Metadata>
            <TimestampEntry term="Date Issued" value={forecast.dateIssued} />
            <ValidUntil
                dateIssued={forecast.dateIssued}
                validUntil={forecast.validUntil}
            />
            <Entry term="Prepared by">{forecast.forecaster}</Entry>
            {shareUrl && <ShareEntry url={shareUrl} />}
        </Metadata>
    ) : null
}

// Components
ValidUntil.propTypes = {
    validUntil: PropTypes.instanceOf(Date).isRequired,
    dateIssued: PropTypes.instanceOf(Date).isRequired,
}

function ValidUntil({ dateIssued, validUntil }) {
    return (
        <Entry term="Valid Until">
            {differenceInDays(dateIssued, validUntil) > FURTHER_NOTICE_DAYS ? (
                <span>Until further notice</span>
            ) : (
                <DateTime value={validUntil} />
            )}
        </Entry>
    )
}
const FURTHER_NOTICE_DAYS = 7
