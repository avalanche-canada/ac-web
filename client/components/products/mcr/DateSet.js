import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { DateElement, Range } from 'components/time'
import styles from './MountainConditionsReport.css'

export default class DateSet extends PureComponent {
    static propTypes = {
        values: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
    }
    render() {
        const [from, to] = this.props.values

        return (
            <div className={styles.Date}>
                {to ? (
                    <Range from={from} to={to} />
                ) : (
                    <DateElement value={from} />
                )}
            </div>
        )
    }
}
