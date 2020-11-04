import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, useIntl } from 'react-intl'
import { useReport } from './Context'
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
    const report = useReport()
    const intl = useIntl()

    if (!report) {
        return null
    }

    return (
        <Metadata>
            <TimestampEntry
                term={intl.formatMessage({
                    description: 'FX Metadata',
                    defaultMessage: 'Date Issued',
                })}
                value={report.dateIssued}
            />
            <ValidUntil
                dateIssued={report.dateIssued}
                validUntil={report.validUntil}
            />
            <Entry
                term={intl.formatMessage({
                    description: 'FX Metadata',
                    defaultMessage: 'Prepared by',
                })}>
                {report.forecaster}
            </Entry>
            {shareUrl && <ShareEntry url={shareUrl} />}
        </Metadata>
    )
}

// Components
ValidUntil.propTypes = {
    validUntil: PropTypes.instanceOf(Date).isRequired,
    dateIssued: PropTypes.instanceOf(Date).isRequired,
}

function ValidUntil({ dateIssued, validUntil }) {
    const intl = useIntl()
    const term = intl.formatMessage({
        description: 'FX Metadata',
        defaultMessage: 'Valid Until',
    })

    return (
        <Entry term={term}>
            {differenceInDays(dateIssued, validUntil) > FURTHER_NOTICE_DAYS ? (
                <span>
                    <FormattedMessage
                        defaultMessage="Until further notice"
                        description="FX Metadata"
                    />
                </span>
            ) : (
                <DateTime value={validUntil} />
            )}
        </Entry>
    )
}
const FURTHER_NOTICE_DAYS = 7
