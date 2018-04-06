import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Consumer } from './Context'
import { ArchiveWarning as Base } from 'components/misc'
import { DateElement } from 'components/time'
import subDays from 'date-fns/sub_days'
import addDays from 'date-fns/add_days'
import format from 'date-fns/format'
import isToday from 'date-fns/is_today'

class ArchiveWarningComponent extends PureComponent {
    static propTypes = {
        region: PropTypes.string.isRequired,
        date: PropTypes.instanceOf(Date).isRequired,
    }
    createLink(date = new Date()) {
        const { region } = this.props
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
    render() {
        const { date } = this.props
        const previous = subDays(date, 1)
        const next = addDays(date, 1)
        const props = {
            nowcast: {
                to: this.createLink(),
                children: "Read today's bulletin",
            },
            previous: {
                to: this.createLink(previous),
                children: <DateElement value={previous} />,
            },
            next: {
                to: this.createLink(next),
                children: <DateElement value={next} />,
            },
        }

        return <Base {...props}>This is an archived avalanche bulletin</Base>
    }
}

export default function ArchiveWarning() {
    return (
        <Consumer>
            {forecast =>
                forecast && forecast.isArchived ? (
                    <ArchiveWarningComponent
                        region={forecast.region}
                        date={forecast.date}
                    />
                ) : null
            }
        </Consumer>
    )
}
