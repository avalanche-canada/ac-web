import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import {Link} from 'react-router'
import Alert, {WARNING} from 'components/alert'
import {DateElement} from 'components/misc'
import subDays from 'date-fns/sub_days'
import addDays from 'date-fns/add_days'
import format from 'date-fns/format'
import isYesterday from 'date-fns/is_yesterday'
import styles from './Forecast.css'

function createLink(region, date) {
    return `/forecasts/${region}/${format(date, 'YYYY-MM-DD')}`
}

ArchiveWarning.propTypes = {
    region: PropTypes.string.isRequired,
}

function ArchiveWarning({region, date}) {
    const previous = subDays(date, 1)
    const next = addDays(date, 1)

    return (
        <Alert type={WARNING}>
            This is an archived avalanche bulletin
            <Link styleName='TodayLink' to={`/forecasts/${region}`}>
                Read today's bulletin
            </Link>
            <div styleName='ArchiveWarningLinks'>
                <Link styleName='PreviousLink' to={createLink(region, previous)}>
                    <DateElement value={previous} />
                </Link>
                {isYesterday(date) ||
                <Link styleName='NextLink' to={createLink(region, next)}>
                    <DateElement value={next} />
                </Link>
                }
            </div>
        </Alert>
    )
}

export default CSSModules(ArchiveWarning, styles)
