import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styles from './ArchiveDatePicker.css'
import { DateElement } from 'components/time'
import format from 'date-fns/format'
import { DayPicker } from 'components/controls'

// TODO: Move to another location, so it can be used between components.

export default class ArchiveDatePicker extends PureComponent {
    static propTypes = {
        region: PropTypes.string.isRequired,
        date: PropTypes.instanceOf(Date),
    }
    state = {
        date: this.props.date,
    }
    setDate = date => this.setState({ date })
    render() {
        const { region } = this.props
        const { date } = this.state

        return (
            <div className={styles.ArchiveDatePicker}>
                <DayPicker date={date} onChange={this.setDate}>
                    {date ? <DateElement value={date} /> : 'Select a date'}
                </DayPicker>
                {date && (
                    <Link
                        className={styles['ArchiveDatePicker--Link']}
                        to={`/forecasts/archives/${region}/${format(
                            date,
                            'YYYY-MM-DD'
                        )}`}>
                        Read avalanche bulletin
                    </Link>
                )}
            </div>
        )
    }
}
