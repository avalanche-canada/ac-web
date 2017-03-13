import React, {PropTypes} from 'react'
import {compose} from 'recompose'
import CSSModules from 'react-css-modules'
import {withRouter, Link} from 'react-router'
import Alert, {WARNING} from 'components/alert'
import {DateElement} from 'components/misc'
import subDays from 'date-fns/sub_days'
import addDays from 'date-fns/add_days'
import format from 'date-fns/format'
import isToday from 'date-fns/is_today'
import styles from './Forecast.css'

function createLink(region, date, isArchivesPage) {
    const paths = ['/forecasts']

    if (isArchivesPage) {
        paths.push('archives')
    }

    paths.push(region)

    if (!isToday(date)) {
        paths.push(format(date, 'YYYY-MM-DD'))
    }

    return paths.join('/')
}

ArchiveWarning.propTypes = {
    region: PropTypes.string.isRequired,
}

function ArchiveWarning({region, date, router}) {
    const isArchivesPage = router.isActive(createLink(region, date, true))
    const previous = subDays(date, 1)
    const next = addDays(date, 1)

    return (
        <Alert type={WARNING}>
            This is an archived avalanche bulletin
            <Link styleName='TodayLink' to={`/forecasts/${region}`}>
                Read today's bulletin
            </Link>
            <div styleName='ArchiveWarningLinks'>
                <Link styleName='PreviousLink' to={createLink(region, previous, isArchivesPage)}>
                    <DateElement value={previous} />
                </Link>
                <Link styleName='NextLink' to={createLink(region, next, isArchivesPage)}>
                    <DateElement value={next} />
                </Link>
            </div>
        </Alert>
    )
}

export default compose(
    withRouter,
    CSSModules(styles),
)(ArchiveWarning)
