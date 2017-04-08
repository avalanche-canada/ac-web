import React from 'react'
import PropTypes from 'prop-types'
import {compose, withState} from 'recompose'
import {Link} from 'react-router'
import CSSModules from 'react-css-modules'
import styles from './ArchiveDatePicker.css'
import {DateUtils, DateElement, Day} from 'components/misc'
import format from 'date-fns/format'
import {DayPicker} from 'components/controls'

// TODO: Move to another location, so it can be used between components.

ArchiveDatePicker.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    region: PropTypes.string.isRequired,
    onReadClick: PropTypes.func.isRequired,
}

function ArchiveDatePicker({date, region, onReadClick, selectedDate, setSelectedDate}) {
    return (
        <div styleName='ArchiveDatePicker'>
            <DayPicker date={selectedDate || date} onChange={setSelectedDate}>
                {selectedDate ?
                    <DateElement value={selectedDate} /> :
                    'Select a date'
                }
            </DayPicker>
            {selectedDate &&
                <Link styleName='ArchiveDatePicker--Link' to={`/forecasts/${region}/${format(selectedDate, 'YYYY-MM-DD')}`}>
                    Read avalanche bulletin
                </Link>
            }
        </div>
    )
}

export default compose(
    withState('selectedDate', 'setSelectedDate'),
    CSSModules(styles),
)(ArchiveDatePicker)
