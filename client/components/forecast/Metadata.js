import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Consumer } from './Context'
import { DateTime } from 'components/time'
import {
    Metadata,
    Entry,
    ShareEntry,
    TimestampEntry,
} from 'components/metadata'
import differenceInDays from 'date-fns/difference_in_days'
import { FURTHER_NOTICE_DAYS } from 'constants/forecast/time'

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

export default class ForecastMetadata extends PureComponent {
    static propTypes = {
        shareUrl: PropTypes.string,
    }
    render() {
        const { shareUrl } = this.props

        return (
            <Consumer>
                {forecast =>
                    forecast ? (
                        <Metadata>
                            <TimestampEntry
                                term="Date Issued"
                                value={forecast.dateIssued}
                            />
                            <ValidUntil
                                dateIssued={forecast.dateIssued}
                                validUntil={forecast.validUntil}
                            />
                            <Entry term="Prepared by">
                                {forecast.forecaster}
                            </Entry>
                            {shareUrl && <ShareEntry url={shareUrl} />}
                        </Metadata>
                    ) : null
                }
            </Consumer>
        )
    }
}
