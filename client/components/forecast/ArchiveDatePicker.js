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
        date: PropTypes.instanceOf(Date).isRequired,
        selectedDate: PropTypes.instanceOf(Date).isRequired,
        setSelectedDate: PropTypes.func.isRequired,
    }
    state = {
        selectedDate: null,
    }
    constructor(props) {
        super(props)
    }
    setSelectedDate = selectedDate => this.setState({ selectedDate })
    render() {
        const { date, region } = this.props
        const { selectedDate } = this.state

        return (
            <div className={styles.ArchiveDatePicker}>
                <DayPicker
                    date={selectedDate || date}
                    onChange={this.setSelectedDate}>
                    {selectedDate ? (
                        <DateElement value={selectedDate} />
                    ) : (
                        'Select a date'
                    )}
                </DayPicker>
                {selectedDate && (
                    <Link
                        className={styles['ArchiveDatePicker--Link']}
                        to={`/forecasts/archives/${region}/${format(
                            selectedDate,
                            'YYYY-MM-DD'
                        )}`}>
                        Read avalanche bulletin
                    </Link>
                )}
            </div>
        )
    }
}
