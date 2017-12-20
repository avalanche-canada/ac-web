import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Metadata, Entry, ShareEntry } from 'components/metadata'
import { DateElement } from 'components/time'
import { DATETIME } from 'utils/date'
import differenceInDays from 'date-fns/difference_in_days'
import { FURTHER_NOTICE_DAYS } from 'constants/forecast/time'

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
    dateIssued: PropTypes.instanceOf(Date).isRequired,
}

export function ValidUntil({ dateIssued, validUntil }) {
    let node = null

    if (differenceInDays(dateIssued, validUntil) > FURTHER_NOTICE_DAYS) {
        node = <span>Until further notice</span>
    } else {
        node = <DateElement format={DATETIME} value={validUntil} />
    }

    return <Entry term="Valid Until">{node}</Entry>
}

Forecaster.propTypes = {
    forecaster: PropTypes.string.isRequired,
}

export function Forecaster({ forecaster }) {
    return <Entry term="Prepared by">{forecaster}</Entry>
}

export default class ForecastMetadata extends PureComponent {
    static render(forecast, shareUrl) {
        return (
            <ForecastMetadata
                dateIssued={forecast.get('dateIssued')}
                validUntil={forecast.get('validUntil')}
                forecaster={forecast.get('forecaster')}
                shareUrl={shareUrl}
            />
        )
    }
    static propTypes = {
        dateIssued: PropTypes.instanceOf(Date).isRequired,
        validUntil: PropTypes.instanceOf(Date).isRequired,
        forecaster: PropTypes.string,
        shareUrl: PropTypes.string,
    }
    render() {
        const { shareUrl, dateIssued, validUntil, forecaster } = this.props

        return (
            <Metadata>
                <DateIssued dateIssued={dateIssued} />
                <ValidUntil dateIssued={dateIssued} validUntil={validUntil} />
                <Forecaster forecaster={forecaster} />
                {shareUrl && <ShareEntry url={shareUrl} />}
            </Metadata>
        )
    }
}
