import React from 'react'
import PropTypes from 'prop-types'
import { Consumer } from './Context'
import { ArchiveWarning as Base } from 'components/misc'
import { DateElement } from 'components/time'
import subDays from 'date-fns/sub_days'
import addDays from 'date-fns/add_days'
import format from 'date-fns/format'
import isToday from 'date-fns/is_today'

ArchiveWarningComponent.propTypes = {
    region: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
}

function ArchiveWarningComponent({ region, date }) {
    function createLink(date = new Date()) {
        const paths = ['/forecasts']

        if (isToday(date)) {
            paths.push(region)
        } else {
            paths.push('archives')
            paths.push(region)
            paths.push(format(date, 'YYYY-MM-DD'))
        }

        return paths.join('/')
    }

    const previous = subDays(date, 1)
    const next = addDays(date, 1)
    const props = {
        nowcast: {
            to: createLink(),
            children: "Read today's bulletin",
        },
        previous: {
            to: createLink(previous),
            children: <DateElement value={previous} />,
        },
        next: {
            to: createLink(next),
            children: <DateElement value={next} />,
        },
    }

    return <Base {...props}>This is an archived avalanche bulletin</Base>
}

ArchiveWarning.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
}

export default function ArchiveWarning({ date }) {
    return (
        <Consumer>
            {forecast =>
                forecast && forecast.isArchived ? (
                    <ArchiveWarningComponent
                        region={forecast.region}
                        date={date}
                    />
                ) : null
            }
        </Consumer>
    )
}
